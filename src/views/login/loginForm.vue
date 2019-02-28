<template>
  <div>
    <a-row>
      <a-col :xl="7" :xxl="6" :offset="9" style="margin-top: 3%">
        <a-card style="opacity: 0.9" :title="$t('message.common.title')" :bordered=false :headStyle="cardTitleStyle">
          <a-form :form="formData" id='components-form-demo-normal-login' @submit="onLogin" class='login-form'>
            <a-form-item hasFeedback>
              <a-input
                :placeholder="$t('message.signin.username')"
                v-decorator="[
                  'userName',
                  { rules: [{ required: true, message: 'Please input your username!' }] }
                ]"
                >
                <a-icon slot="prefix" type='user' style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item hasFeedback>
              <a-input
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: 'Please input your Password!' }] }
                ]"
                type='password'
                :placeholder="$t('message.signin.psw')"
                >
                <a-icon slot="prefix" type='lock' style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-radio-group v-model="lang">
                <a-radio-button value="zh">中文</a-radio-button>
                <a-radio-button value="en">English</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item>
              <a-button type='primary' htmlType='submit' style='width: 100%'>
                {{$t('message.signin.signin')}}
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'loginForm',
  data () {
    return {
      formData: this.$form.createForm(this),
      lang: '',
      cardTitleStyle: {
        textAlign: 'center',
        fontSize: '1.5em'
      }
    }
  },
  created () {
    let curLang = localStorage.getItem('lang')

    if (curLang) this.lang = curLang
    else this.lang = 'zh'

    this.$i18n.locale = this.lang
  },
  watch: {
    lang (val) {
      localStorage.setItem('lang', this.lang)
      this.$i18n.locale = this.lang
      document.title = this.$t('message.common.title')
    }
  },
  methods: {
    onLogin (e) {
      e.preventDefault()
      this.formData.validateFields((err, values) => {
        this.$router.push({ path: '/system-info' })
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    reset (e) {
      this.formData.resetFields()
    }
  }
}
</script>
