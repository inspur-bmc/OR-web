<template>
  <view-content message="redfish" @refresh="refresh">

  </view-content>
</template>

<script>
import ViewContent from '@/components/viewContent'
import { mapMutations } from 'vuex'

export default {
  name: 'redfish',
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
    ViewContent
  }
}
</script>
