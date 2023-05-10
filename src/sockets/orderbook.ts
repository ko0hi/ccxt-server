import { Socket } from 'socket.io'
import { Exchange } from 'ccxt'
import { checkRequiredParameters, initCcxtClientForSocket } from '../utils/ccxt'

const watchOrderBookRealtime = async (socket: Socket, exchange: Exchange, symbol: string, limit: number) => {
  while (socket.connected) {
    try {
      const orderbook = await exchange.watchOrderBook(symbol, limit)
      socket.emit('orderbook', { symbol, orderbook })
    } catch (e) {
      console.log(e)
    }
  }
  exchange.close()
}

const watchOrderBookThrottle = async (
  socket: Socket,
  exchange: Exchange,
  symbol: string,
  limit: number,
  interval: number
) => {
  await exchange.watchOrderBook(symbol, limit)
  while (socket.connected) {
    try {
      const orderbook = exchange.orderbooks[symbol]
      socket.emit('orderbook', { symbol, orderbook })
      await new Promise(res => setTimeout(res, interval * 1000))
    } catch (e) {
      console.log(e)
    }
  }
  exchange.close()
}

const handleOrderbookSocket = async (
  socket: Socket,
  payload: {
    exchangeId: string
    symbol: string
    interval?: number
    limit?: number
  }
) => {
  const { exchangeId, symbol } = payload
  const interval = payload.interval || 0
  const limit = payload.limit || 10

  Promise.resolve()
    .then(() => checkRequiredParameters({ exchangeId, symbol }))
    .then(() => initCcxtClientForSocket(exchangeId, 'watchOrderBook'))
    .then(async exchange => {
      try {
        if (interval === 0) {
          await watchOrderBookRealtime(socket, exchange, symbol, limit)
        } else {
          await watchOrderBookThrottle(socket, exchange, symbol, limit, interval)
        }
      } finally {
        exchange.close()
      }
    })
    .catch(error => socket.emit('error', error.toString()))
    .finally(() => socket.disconnect())
}

export default handleOrderbookSocket
