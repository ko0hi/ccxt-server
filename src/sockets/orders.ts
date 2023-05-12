import { Socket } from 'socket.io'
import { checkRequiredParameters, initCcxtClientForSocket } from '../utils/ccxt'
import { Exchange } from 'ccxt'
import { ExchangeOptions } from '../types/ccxt'

const watchOrders = async (socket: Socket, exchange: Exchange, symbol?: string) => {
  while (socket.connected) {
    try {
      const orders = await exchange.watchOrders(symbol)
      socket.emit('orders', { symbol, orders })
    } catch (e) {
      console.log(e)
    }
  }
  exchange.close()
}

const handleOrdersSocket = async (
  socket: Socket,
  payload: {
    exchangeId: string
    symbol?: string
  },
  options?: ExchangeOptions
) => {
  const { exchangeId, symbol } = payload

  Promise.resolve()
    .then(() => checkRequiredParameters({ exchangeId }))
    .then(() => initCcxtClientForSocket(exchangeId, 'watchOrders', options))
    .then(async exchange => {
      try {
        await watchOrders(socket, exchange, symbol)
      } finally {
        exchange.close()
      }
    })
    .catch(error => socket.emit('error', error.toString()))
    .finally(() => socket.disconnect())
}

export default handleOrdersSocket
