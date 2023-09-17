import http from 'node:http'

import routes from './Routes'

export const server = http.createServer((request, response) => {
  const { method, url } = request
  const routeKey = `${method!.toLowerCase()}:${url?.split(
    '?'
  )[0]}` as keyof typeof routes
  const routeHandler = routes[routeKey] || routes['default']
  routeHandler(request, response)
})

server.listen(3000, () => console.log('Running on port 3000'))
