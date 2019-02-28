<template>
  <view-content message="fanCtrl" @refresh="refresh">
    <a-row style="margin-bottom: 20px">
      <a-col :span="4">
        <span style="margin-right: 10px">{{$t('message.fanCtrl.manual_mode')}}</span>
        <a-switch v-model="manualMode" :checkedChildren="$t('message.common.on')" :unCheckedChildren="$t('message.common.off')"/>
      </a-col>
    </a-row>
    <a-table :columns="columns" :dataSource="fanData" rowKey='id' size="small">
      <span slot="status" slot-scope="status">
        <a-icon v-if="status == 1" type="check-circle" style="color: green;font-size: 1.2em;"/>
        <a-icon v-else type="close-circle" style="color: grey;font-size: 1.2em;"/>
      </span>
      <span slot="duty" slot-scope="duty">
        {{duty + '%'}}
      </span>
      <span slot="action" slot-scope="record">
        <a-button-group>
          <a-button :disabled="!record.status || !manualMode" @click.prevent="() => setRpm(record.id, 25)">25%</a-button>
          <a-button :disabled="!record.status || !manualMode" @click.prevent="() => setRpm(record.id, 50)">50%</a-button>
          <a-button :disabled="!record.status || !manualMode" @click.prevent="() => setRpm(record.id, 75)">75%</a-button>
          <a-button :disabled="!record.status || !manualMode" @click.prevent="() => setRpm(record.id, 100)">100%</a-button>
        </a-button-group>
      </span>
    </a-table>
    <a-row style="margin-bottom: 20px;">
      <a-col :span="2">
        <a-icon type="check-circle" style="color: green;font-size: 1.2em;margin-right: 10px"/>在位
      </a-col>
      <a-col :span="2">
        <a-icon type="close-circle" style="color: grey;font-size: 1.2em;margin-right: 10px"/>不在位
      </a-col>
    </a-row>
  </view-content>
</template>

<script>
import ViewContent from '@/components/viewContent'
import { mapMutations } from 'vuex'

export default {
  name: 'fanController',
  data () {
    return {
      manualMode: true,
      columns: [
        { title: 'No.', dataIndex: 'id' },
        { title: this.$t('message.fanCtrl.thead_status'), dataIndex: 'status', align: 'center', scopedSlots: { customRender: 'status' } },
        { title: this.$t('message.fanCtrl.thead_rpm'), dataIndex: 'rpm', align: 'center' },
        { title: this.$t('message.fanCtrl.thead_duty'), dataIndex: 'duty', align: 'center', scopedSlots: { customRender: 'duty' } },
        { title: this.$t('message.fanCtrl.thead_action'), align: 'center', scopedSlots: { customRender: 'action' } }
      ],
      fanData: [
        { id: 0, status: 1, rpm: 3636, duty: 25 },
        { id: 1, status: 1, rpm: 3636, duty: 25 },
        { id: 2, status: 1, rpm: 3636, duty: 25 },
        { id: 3, status: 0, rpm: 0, duty: 0 },
        { id: 4, status: 0, rpm: 0, duty: 0 },
        { id: 5, status: 0, rpm: 0, duty: 0 }
      ]
    }
  },
  created () {
    this.refresh()
  },
  methods: {
    ...mapMutations(['setRefreshFlag']),
    refresh () {
      setTimeout(() => {
        this.setRefreshFlag({ refreshFlag: false })
      }, 1000)
    },
    setRpm (id, duty) {
      console.log(id + ', ' + duty)
    }
  },
  components: {
    ViewContent
  }
}
</script>

<style scoped>

</style>
