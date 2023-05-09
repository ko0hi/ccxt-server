import ccxt, {Exchange} from 'ccxt'
import {ExchangeOptions} from "../types/ccxt";
import {Socket} from "socket.io";
import {UnsupportedExchangeError, UnsupportedMethodError} from "../exceptions";

export const initCcxtProClientForSocket = (socket: Socket, method: string, exchangeId: string, options: ExchangeOptions = {}): Exchange => {
    const exchangeClass = ccxt.pro[exchangeId]

    if (!exchangeClass) {
        throw new UnsupportedExchangeError(exchangeId)
        // socket.emit('error', `Unsupported pro exchange: ${exchangeId}`);
        return
    }

    const exchange = new exchangeClass(options)

    if (!exchange.has[method]) {
        throw new UnsupportedMethodError(`${exchangeId}.${method}`)
        // socket.emit('error', `${exchangeId} does not support ${method}`);
        return;
    }

    return exchange
}