<template>
  <a-table :columns="columns" :dataSource="memInfo" size="small">

  </a-table>
</template>

<script>
export default {
  name: 'memInfo',
  props: ['memInfo'],
  data () {
    return {
      columns: [
        { title: 'No.', dataIndex: 'id' },
        { title: this.$t('message.sysInfo.thead_loc'), dataIndex: 'loc', align: 'center' },
        { title: this.$t('message.sysInfo.thead_size'), dataIndex: 'size', align: 'center' },
        { title: this.$t('message.sysInfo.thead_type'), dataIndex: 'type', align: 'center' },
        { title: this.$t('message.sysInfo.thead_mf'), dataIndex: 'mf', align: 'center' },
        { title: this.$t('message.sysInfo.thead_manufacturer'), dataIndex: 'manufacturer', align: 'center' },
        { title: this.$t('message.sysInfo.thead_pn'), dataIndex: 'pn', align: 'center' },
        { title: this.$t('message.sysInfo.thead_sn'), dataIndex: 'sn', align: 'center' },
        { title: this.$t('message.sysInfo.thead_mv'), dataIndex: 'mv', align: 'center' },
        { title: this.$t('message.sysInfo.thead_rank'), dataIndex: 'rank', align: 'center' }
      ]
    }
  }
}
</script>
