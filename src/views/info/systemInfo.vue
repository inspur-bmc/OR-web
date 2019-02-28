<template>
  <view-content message="sysInfo" @refresh="refresh">
    <a-tabs tabPosition="left">
      <a-tab-pane :tab="$t('message.sysInfo.cpu')" key="cpu">
        <cpu-info></cpu-info>
      </a-tab-pane>
      <a-tab-pane :tab="$t('message.sysInfo.mem')" key="mem">
        <mem-info></mem-info>
      </a-tab-pane>
      <a-tab-pane :tab="$t('message.sysInfo.psu')" key="psu">
        <psu-info></psu-info>
      </a-tab-pane>
      <a-tab-pane :tab="$t('message.sysInfo.fan')" key="fan">
        <fan-info></fan-info>
      </a-tab-pane>
    </a-tabs>
  </view-content>
</template>

<script>
import ViewContent from '@/components/viewContent'
import { mapMutations } from 'vuex'

import CpuInfo from './components/cpuInfo'
import MemInfo from './components/memInfo'
import PsuInfo from './components/psuInfo'
import FanInfo from './components/fanInfo'

export default {
  name: 'systemInfo',
  created () {
    this.refresh()
  },
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['setRefreshFlag']),
    refresh () {
      setTimeout(() => {
        this.setRefreshFlag({ refreshFlag: false })
      }, 1000)
    }
  },
  components: {
    ViewContent,
    CpuInfo,
    MemInfo,
    PsuInfo,
    FanInfo
  }
}
</script>
