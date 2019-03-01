<template>
  <view-content message="sensor" @refresh="refresh">
    <a-row style="margin-bottom: 20px">
      <a-col :span="24">
        <a-table :columns="columns" :dataSource="parsedData" size="small" rowKey='id'>
          <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
            <a-input
              v-ant-ref="c => searchInput = c"
              :placeholder="$t('message.sensor.search_placeholder')"
              :value="selectedKeys[0]"
              @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
              @pressEnter="() => handleSearch(selectedKeys, confirm)"
              style="width: 188px; margin-bottom: 8px; display: block;"
            />
            <a-button
              type='primary'
              @click="() => handleSearch(selectedKeys, confirm)"
              icon="search"
              size="small"
              style="width: 90px; margin-right: 8px"
            >{{$t('message.common.search')}}</a-button>
            <a-button
              @click="() => handleReset(clearFilters)"
              size="small"
              style="width: 90px"
            >{{$t('message.common.reset')}}</a-button>
          </div>
          <a-icon slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : undefined }" />
          <template slot="searchTitle" slot-scope="text">
            <span v-if="searchText">
              <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
                <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</mark>
                <template v-else>{{fragment}}</template>
              </template>
            </span>
            <template v-else>{{text}}</template>
          </template>
          <span slot="status" slot-scope="status">
            <a-icon v-if="status == 'normal'" type="check-circle" style="color: green;font-size: 1.2em;"/>
            <a-icon v-else-if="status == 'warning'" type="warning" style="color: orange;font-size: 1.2em;"/>
            <span v-else class="iconfont icon-radioactive" style="color: red;font-size: 1.2em;"/>
          </span>
          <!-- eslint-disable-next-line vue/no-parsing-error -->
          <div v-for="(item, index) in scaleList" :key="index" :slot="item" slot-scope="value, record">
            <span v-if="record.unit == 'C'">
              {{value + ' ℃'}}
            </span>
            <span v-else-if="record.unit == 'volts'">
              {{value + ' V'}}
            </span>
            <span v-else-if="record.unit == 'rpms'">
              {{value + ' rpm'}}
            </span>
            <span v-else-if="record.unit == 'watts'">
              {{value + ' W'}}
            </span>
            <span v-else-if="record.unit == 'amperes'">
              {{value + ' A'}}
            </span>
          </div>
        </a-table>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="2">
        <a-icon type="check-circle" style="color: green;font-size: 1.2em;margin-right: 10px"/>{{$t('message.sensor.normal')}}
      </a-col>
      <a-col :span="2">
        <a-icon type="warning" style="color: orange;font-size: 1.2em;margin-right: 10px"/>{{$t('message.sensor.warning')}}
      </a-col>
      <a-col :span="2">
        <span class="iconfont icon-radioactive" style="color: red;font-size: 1.2em;margin-right: 10px"/>{{$t('message.sensor.critical')}}
      </a-col>
    </a-row>
  </view-content>
</template>

<script>
import ViewContent from '@/components/viewContent'
import { mapMutations } from 'vuex'

import errorHandler, { getSensorInfo } from '@/service/api'
import { parseSensorData } from '@/service/utils/'

export default {
  name: 'sensor',
  data () {
    return {
      scaleList: ['Value', 'WarningLow', 'WarningHigh', 'CriticalLow', 'CriticalHigh'],
      searchText: '',
      searchInput: null,
      sensorData: {},
      searchParams: {
        sensor: undefined,
        severity: undefined
      },
      columns: [
        { title: this.$t('message.sensor.thead_sensor'),
          dataIndex: 'title',
          width: 250,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'searchTitle'
          },
          onFilter: (value, record) => record.title.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          }
        },
        { title: this.$t('message.sensor.thead_status'),
          dataIndex: 'status',
          align: 'center',
          scopedSlots: { customRender: 'status' },
          filters: [{
            text: this.$t('message.sensor.normal'),
            value: 'normal'
          }, {
            text: this.$t('message.sensor.warning'),
            value: 'warning'
          }, {
            text: this.$t('message.sensor.critical'),
            value: 'critical'
          }],
          onFilter: (value, record) => record.status.indexOf(value) === 0
        },
        { title: this.$t('message.sensor.thead_current_reading'), dataIndex: 'Value', align: 'center', scopedSlots: { customRender: 'Value' } },
        { title: this.$t('message.sensor.thead_low_warning'), dataIndex: 'WarningLow', align: 'center', scopedSlots: { customRender: 'WarningLow' } },
        { title: this.$t('message.sensor.thead_high_warning'), dataIndex: 'WarningHigh', align: 'center', scopedSlots: { customRender: 'WarningHigh' } },
        { title: this.$t('message.sensor.thead_low_critical'), dataIndex: 'CriticalLow', align: 'center', scopedSlots: { customRender: 'CriticalLow' } },
        { title: this.$t('message.sensor.thead_high_critical'), dataIndex: 'CriticalHigh', align: 'center', scopedSlots: { customRender: 'CriticalHigh' } }
      ],
      parsedData: []
    }
  },
  methods: {
    ...mapMutations(['setRefreshFlag']),
    async refresh () {
      try {
        this.sensorData = await getSensorInfo()
      } catch (error) {
        errorHandler(this, error, this.$t('message.sensor.get_err_msg'))
      }

      this.setRefreshFlag({ refreshFlag: false })
      this.parsedData = parseSensorData(this.sensorData)
    },

    // 搜索传感器名称
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },

    // 重置搜索框
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    }

  },
  components: {
    ViewContent
  }
}
</script>

<style lang="less" scoped>
.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
