import http from './http'

// 获取传感器信息
export let getSensorInfo = () => http('get', '/xyz/openbmc_project/sensors/enumerate')
