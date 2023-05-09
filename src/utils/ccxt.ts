import {ExchangeOptions} from "../types/ccxt";
import ccxt, {Exchange} from "ccxt";
import {CcxtServerError} from "../exceptions";
export const initCcxtClient = (exchangeId: string, options: ExchangeOptions = {}): Exchange => {
    const exchangeClass = ccxt[exchangeId]

    if (!exchangeClass) {
        throw new CcxtServerError(`Unsupported exchange: ${exchangeId}`);
    }

    return new exchangeClass(options)
}

export const initCcxtProClient = (exchangeId: string, options: ExchangeOptions = {}): Exchange => {
    const exchangeClass = ccxt.pro[exchangeId]

    if (!exchangeClass) {
        throw new CcxtServerError(`Unsupported pro exchange: ${exchangeId}`);
    }

    return new exchangeClass(options)
}