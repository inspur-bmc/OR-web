<template>
  <div>
    <a-row>
      <a-col :span="24">
        <h1 class="view-title">{{$t('message.fru.title')}}</h1>
        <span style="color: #9E9E9E">{{$t('message.fru.sub_title')}}</span>
        <a-tooltip placement="top" >
          <template slot="title">
            <span>{{$t('message.common.help')}}</span>
          </template>
          <span class="help-mark"><a-icon type="question-circle" @click="toggleHelp"/></span>
        </a-tooltip>
      </a-col>
    </a-row>
    <help-card :helpFlag="helpFlag">{{$t('message.fru.helpMsg')}}</help-card>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card :bordered="false" :loading="refreshFlag" :title="$t('message.fru.chassis')">
          <a-row class="item-row">
            <a-col :span="12"><span class="content-label">{{$t('message.fru.chassis_type')}}</span></a-col>
            <a-col :span="12"><span class="courier-bold">Switch</span></a-col>
          </a-row>
          <a-row class="item-row">
            <a-col :span="12"><span class="content-label">{{$t('message.fru.chassis_partno')}}</span></a-col>
            <a-col :span="12"><span class="courier-bold">{{chassisInfo.PartNumber}}</span></a-col>
          </a-row>
          <a-row class="item-row">
            <a-col :span="12"><span class="content-label">{{$t('message.fru.chassis_serialno')}}</span></a-col>
            <a-col :span="12"><span class="courier-bold">{{chassisInfo.SerialNumber}}</span></a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card :bordered="false" :loading="refreshFlag" :title="$t('message.fru.board')">
          <a-row class="item-row">
            <a-col :span="12"><span class="content-label">{{$t('message.fru.manufacture_datetime')}}</span></a-col>
            <a-col :span="12"><span class="courier-bold">{{boardInfo.BuildDate}}</span></a-col>
          </a-row>
          <a-row class="item-row">
            <a-col :span="12"><span class="content-label">{{$t('message.fru.board_manufac')}}</span></a-col>
            <a-col :span="12"><span class="courier-bold">{{boardInfo.Manufacturer}}</span></a-col>
          </a-row>
          <a-row class="item-row">
            <a-col :span="12"><span class="content-label">{{$t('message.fru.board_productname')}}</span></a-col>
            <a-col :span="12"><span class="courier-bold">{{boardInfo.PrettyName}}</span></a-col>
          </a-row>
          <a-row class="item-row">
            <a-col :span="12"><span class="content-label">{{$t('message.fru.board_serialno')}}</span></a-col>
            <a-col :span="12"><span class="courier-bold">{{boardInfo.SerialNumber}}</span></a-col>
          </a-row>
          <a-row class="item-row">
            <a-col :span="12"><span class="content-label">{{$t('message.fru.board_partno')}}</span></a-col>
            <a-col :span="12"><span class="courier-bold">{{boardInfo.PartNumber}}</span></a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card :bordered="false" :loading="refreshFlag" :title="$t('message.fru.product')">
          <a-row class="item-row">
            <a-col :span="12"><span class="content-label">{{$t('message.fru.product_manufac')}}</span></a-col>
            <a-col :span="12"><span class="courier-bold">{{productInfo.Manufacturer}}</span></a-col>
          </a-row>
          <a-row class="item-row">
            <a-col :span="12"><span class="content-label">{{$t('message.fru.product_name')}}</span></a-col>
            <a-col :span="12"><span class="courier-bold">{{productInfo.PrettyName}}</span></a-col>
          </a-row>
          <a-row class="item-row">
            <a-col :span="12"><span class="content-label">{{$t('message.fru.product_partnumber')}}</span></a-col>
            <a-col :span="12"><span class="courier-bold">{{productInfo.PartNumber}}</span></a-col>
          </a-row>
          <a-row class="item-row">
            <a-col :span="12"><span class="content-label">{{$t('message.fru.product_version')}}</span></a-col>
            <a-col :span="12"><span class="courier-bold">{{productInfo.Version}}</span></a-col>
          </a-row>
          <a-row class="item-row">
            <a-col :span="12"><span class="content-label">{{$t('message.fru.product_serialno')}}</span></a-col>
            <a-col :span="12"><span class="courier-bold">{{productInfo.SerialNumber}}</span></a-col>
          </a-row>
          <a-row class="item-row">
            <a-col :span="12"><span class="content-label">{{$t('message.fru.assettag')}}</span></a-col>
            <a-col :span="12"><span class="courier-bold">{{productInfo.AssetTag}}</span></a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import langWatcher from '@/service/mixin/langWatcher'
import toggleHelp from '@/service/mixin/toggleHelp'
import refreshWatcher from '@/service/mixin/refreshWatcher'
import HelpCard from '@/components/helpCard'

import { mapGetters } from 'vuex'

import errorHandler, { getFruInfo } from '@/service/api'

export default {
  name: 'fru',
  mixins: [langWatcher, toggleHelp, refreshWatcher],
  data () {
    return {
      chassisInfo: {},
      boardInfo: {},
      productInfo: {}
    }
  },
  computed: {
    ...mapGetters({
      lang: 'getLang'
    })
  },
  methods: {
    async refresh () {
      try {
        let [resChassis, resBoard, resProduct] = await getFruInfo()
        this.chassisInfo = resChassis.data
        this.boardInfo = resBoard.data
        this.productInfo = resProduct.data
      } catch (error) {
        errorHandler(this, error, this.$t('message.fru.get_err_msg'))
      }

      this.setRefreshFlag({ refreshFlag: false })
    }
  },
  components: {
    HelpCard
  }
}
</script>
<style scoped lang="less">
.item-row {
  margin-bottom: 15px;
  /* border-bottom: 1px solid grey; */
}

.content-label, label {
  color: #666;
  font-weight: 700;
  font-size: 1em;
  margin-bottom: 0;
}

.courier-bold {
  font-family: "Courier New", Helvetica, arial, sans-serif;
  font-weight: 700;
  margin-top: 10px;
  color: black
}
</style>
