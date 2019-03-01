<template>
  <a-table :columns="columns" :dataSource="cpuInfo" size="small">

  </a-table>
</template>

<script>
export default {
  name: 'cpuInfo',
  props: ['cpuInfo'],
  data () {
    return {
      columns: [
        { title: 'No.', dataIndex: 'id' },
        { title: this.$t('message.sysInfo.thead_model'), dataIndex: 'model', align: 'center' },
        { title: this.$t('message.sysInfo.thead_status'), dataIndex: 'status', align: 'center' },
        { title: this.$t('message.sysInfo.thead_speed'), dataIndex: 'speed', align: 'center' },
        { title: this.$t('message.sysInfo.thead_core'), dataIndex: 'core', align: 'center' },
        { title: this.$t('message.sysInfo.thead_tdp'), dataIndex: 'tdp', align: 'center' },
        { title: this.$t('message.sysInfo.thead_l1'), dataIndex: 'l1', align: 'center' },
        { title: this.$t('message.sysInfo.thead_l2'), dataIndex: 'l2', align: 'center' },
        { title: this.$t('message.sysInfo.thead_l3'), dataIndex: 'l3', align: 'center' },
      ]
    }
  }
}
</script>
