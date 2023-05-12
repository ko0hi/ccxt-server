import { Socket } from 'socket.io'
import handleOrderbookSocket from './orderbook'
import handleOrdersSocket from './orders'
import { getApiKeys } from '../utils/apiKeys'

export const handleSocketConnection = (socket: Socket) => {
  console.log('Client connected:', socket.id)

  // Orderbookイベントのハンドリング
  socket.on('subscribeOrderbook', payload => {
    handleOrderbookSocket(socket, payload).then(r => console.log(r))
  })

  socket.on('subscribeOrders', (payload: { exchangeId: string; apiKey?: string; secret?: string }) => {
    try {
      getApiKeys()
    } catch (e) {
      socket.emit('error', 'Require to give api keys via json file for subscribing private websocket.')
      return
    }

    const apiKeys = getApiKeys()
    const { exchangeId } = payload

    if (!apiKeys.hasOwnProperty(exchangeId)) {
      socket.emit('error', `API key and secret for exchange ${exchangeId} are not found in a given apis json file`)
      return
    }
    const { apiKey, secret } = apiKeys[exchangeId]
    handleOrdersSocket(socket, payload, { apiKey, secret }).then(r => console.log(r))
  })

  // クライアントが切断した際のハンドリング
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
}
