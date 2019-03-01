<template>
  <view-content message="node" @refresh="refresh">
    <a-table :columns="columns" :dataSource="data" size="small"
    ></a-table>
  </view-content>
</template>

<script>
import ViewContent from '@/components/viewContent'
import { mapMutations } from 'vuex'

export default {
  name: 'nodeInfo',
  data () {
    return {
      columns: [
        { title: 'No.' },
        { title: this.$t('message.node.thead_name'), dataIndex: 'name', align: 'center' },
        { title: this.$t('message.node.thead_status'), dataIndex: 'status', align: 'center' },
        { title: this.$t('message.node.thead_power'), dataIndex: 'power', align: 'center' },
        { title: this.$t('message.node.thead_ip'), dataIndex: 'ip', align: 'center' },
        { title: this.$t('message.node.thead_action'), align: 'center' }
      ],
      data: []
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
