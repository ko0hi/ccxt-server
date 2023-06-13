# ccxt-server

ccxt-server is an API server for [ccxt](https://github.com/ccxt/ccxt). You can trade using ccxt by HTTP request.

## Getting started

Install dependencies.

```bash
yarn
```

In development mode.

```bash
yarn start
```

In production mode.
```bash
pm2 install typescript
pm2 start src/server.ts --name ccxt-server
```

The server will be running on `http://localhost:3001`.

If you use private methods, you need to place api keys in a json file and tell the path to the server with `CCXT_SERVER_APIS` environment variable.

```json
{
  "binanceusdm": {
    "apiKey": "xxx",
    "secret": "yyy"
  }
}
```

dotenv is also supported.

```
CCXT_SERVER_APIS=./apis.json
```


## Endpoints

The endpoint convention is `http://localhost:3001/api/{exchange}/{version}/{method}`. 

`exchange` is the name of the exchange supported by ccxt. For example, `binance`, `bitfinex`, `bitmex`, `coinbasepro`, `huobipro`, `okex`, etc.

`version` is `v1` for now.

The following methods are currently supported.

### Public
#### GET /markets

`fetchMarkets` in ccxt.

```bash
curl http://localhost:3001/api/binance/v1/markets
```

#### GET /tickers

`fetchTicker` in ccxt.
```bash
curl http://localhost:3001/api/binance/v1/tickers?symbol=BTC/USDT
```


#### GET /orderbooks

`fetchOrderbook` in ccxt.
```bash
curl http://localhost:3001/api/binance/v1/orderbooks?symbol=BTC/USDT
```
      

### Private
#### GET /positions

`fetchPositions` in ccxt.

```bash
curl http://localhost:3001/api/binance/v1/positions?symbol=BTC/USDT
```


#### GET /orders
`fetchOrders` in ccxt.
    
```bash
curl http://localhost:3001/api/binance/v1/orders?symbol=BTC/USDT
```


#### GET /myTrades
`fetchMyTrades` in ccxt.
```bash
curl http://localhost:3001/api/binance/v1/myTrades?symbol=BTC/USDT
```


#### POST /createOrder
`createOrder` in ccxt.
```bash
curl http://localhost:3001/api/binance/v1/createOrder \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"symbol": "BTC/USDT", "type": "limit", "side": "buy", "amount": 0.001, "price": 10000}'
```


#### POST /cancelOrder
`cancelOrder` in ccxt.
```bash
curl http://localhost:3001/api/binance/v1/cancelOrder \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"symbol": "BTC/USDT", "id": "123456789"}'
```


### Implicits

ccxt provides [*implicit apis*](https://docs.ccxt.com/#/README?id=implicit-api) that supports arbitrary endpoints.

You can also use them with ccxt-server as well.

#### (GET|POST|PUT|DELETE) /implicits/public
#### (GET|POST|PUT|DELETE) /implicits/private

```bash
curl http://localhost:3001/api/binanceusdm/v1/implicits/private?method=fapiPrivateGetAllOrders
```

## WIP
- More endpoints
- Authentication with authentication header (currently BASIC authentication is supported)
- Deploy script