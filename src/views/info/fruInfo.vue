<template>
  <view-content message="fru" @refresh="refresh">
    <a-row v-for="(item, index) in items" :key="index" class="item-row">
      <a-col :span='3'>{{item.label}}</a-col>
      <a-col :span='10'>{{fruInfo[item.key]}}</a-col>
    </a-row>
  </view-content>
</template>

<script>
import ViewContent from '@/components/viewContent'
import { mapMutations } from 'vuex'

export default {
  name: 'fru',
  created () {
    this.refresh()
  },
  data () {
    return {
      fruInfo: {
        id: 0,
        name: 'Board_fru',
        sn: 'ADSFAS2J42',
        mac: '1A:33:4B:8F:B7:00',
        manufacture_date: '2019-01-29',
        divice_version: '2.1.3',
        label_revision: '2.1.2',
        platform_name: 'X86-Intel',
        onie_version: '1.12.8',
        num_macs: '2',
        manufacture: 'Intel',
        service_tag: '0x1234',
        extension: ''
      },
      items: [
        { label: this.$t('message.fru.id'), key: 'id' },
        { label: this.$t('message.fru.name'), key: 'name' },
        { label: this.$t('message.fru.sn'), key: 'sn' },
        { label: this.$t('message.fru.mac'), key: 'mac' },
        { label: this.$t('message.fru.manufacture_date'), key: 'manufacture_date' },
        { label: this.$t('message.fru.divice_version'), key: 'divice_version' },
        { label: this.$t('message.fru.label_revision'), key: 'label_revision' },
        { label: this.$t('message.fru.platform_name'), key: 'platform_name' },
        { label: this.$t('message.fru.onie_version'), key: 'onie_version' },
        { label: this.$t('message.fru.num_macs'), key: 'num_macs' },
        { label: this.$t('message.fru.manufacture'), key: 'manufacture' },
        { label: this.$t('message.fru.service_tag'), key: 'service_tag' },
        { label: this.$t('message.fru.extension'), key: 'extension' }
      ]
    }
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
    ViewContent
  }
}
</script>
<style scoped lang="less">
.item-row {
  margin-bottom: 15px;
  /* border-bottom: 1px solid grey; */
}
</style>
