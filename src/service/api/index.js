export * from './sensor'
export * from './firmwareUpdate'

const msgCodes = [400, 401, 403, 415]

// http通用异常处理
export default function ($v, error, errMsg) {
  if (error.response) {
    let statusCode = error.response.status

    if (msgCodes.indexOf(statusCode) >= 0) {
      $v.$notification.error({
        message: errMsg,
        description: error.response.data,
        placement: 'bottomRight'
      })
      if (statusCode === 401) $v.$router.push({ path: '/login' })
    } else {
      $v.$notification.error({
        message: errMsg,
        description: error.response.data,
        placement: 'bottomRight'
      })
    }
  } else {
    $v.$notification.error({
      message: errMsg,
      description: error.message,
      placement: 'bottomRight'
    })
  }
}
