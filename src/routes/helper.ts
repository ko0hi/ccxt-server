import {Response} from "express";
import ccxt, {Exchange} from "ccxt";
import {ExchangeOptions} from "../types/ccxt";
import {
    CcxtRequestError,
    MissingRequiredParametersError,
    UnsupportedExchangeError,
    UnsupportedMethodError
} from "../exceptions";

export const checkRequiredParameters = (requiredParams: object): void => {
    const missingParams = []
    for (const [key, value] of Object.entries(requiredParams)) {
        if (!value) {
            missingParams.push(key)
        }
    }
    if (missingParams.length > 0) {
        throw new MissingRequiredParametersError(`${missingParams.join(', ')}`)
    }
}

export const initCcxtClientForRest =  (exchangeId: string, method: string, options: ExchangeOptions = {}) : Exchange => {
    const exchangeClass = ccxt.pro[exchangeId]

    if (!exchangeClass) {
        throw new UnsupportedExchangeError(exchangeId)
    }

    const exchange = new exchangeClass(options)

    if (!exchange.has[method] && !exchange.hasOwnProperty(method)) {
        throw new UnsupportedMethodError(`${exchangeId}.${method}`)
    }

  return exchange
}

export const executeCcxtMethod = async (exchange: Exchange, method: string, ...args: any): Promise<any> => {
    try {
        return await exchange[method](...args)
    } catch (error) {
        throw new CcxtRequestError(`${exchange.id}.${method} with ${args}: ${error}`)
    }
}