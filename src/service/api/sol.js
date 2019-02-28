import http from './http'

export const getTerminalPid = () => http('get', '/api/terminal-pid')
