import {initCcxtClientForRest, initCcxtClientForSocket} from './ccxt'; // 適切なファイル名に置き換えてください
import {UnsupportedExchangeError, UnsupportedMethodError} from '../exceptions';


describe('initCcxtClientForRest', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize a valid ccxt client for REST', () => {
        const exchange = initCcxtClientForRest('binance', 'fetchMyTrades', {
            apiKey: 'testApiKey',
            secret: 'testSecret'
        });
        expect(exchange.id).toBe('binance');
    });

    it('should throw an UnsupportedExchangeError for an invalid exchange', () => {
        expect(() => initCcxtClientForRest('nonexistentExchange', 'fetchMyTrades')).toThrow(UnsupportedExchangeError);
    });

    it('should throw an UnsupportedMethodError for an unsupported method', () => {
        expect(() => initCcxtClientForRest('binance', 'nonexistentMethod')).toThrow(UnsupportedMethodError);
    });
});

describe('initCcxtClientForSocket', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize a valid ccxt client for REST', () => {
        const exchange = initCcxtClientForSocket('binance', 'fetchMyTrades', {
            apiKey: 'testApiKey',
            secret: 'testSecret'
        });
        expect(exchange.id).toBe('binance');
    });

    it('should throw an UnsupportedExchangeError for an invalid exchange', () => {
        expect(() => initCcxtClientForSocket('nonexistentExchange', 'fetchMyTrades')).toThrow(UnsupportedExchangeError);
    });

    it('should throw an UnsupportedMethodError for an unsupported method', () => {
        expect(() => initCcxtClientForSocket('binance', 'nonexistentMethod')).toThrow(UnsupportedMethodError);
    });
});
