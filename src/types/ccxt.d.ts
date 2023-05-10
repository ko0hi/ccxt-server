export interface ExchangeOptions {
  enableRateLimit?: boolean
  rateLimit?: number
  verbose?: boolean
  timeout?: number
  apiKey?: string
  secret?: string
  uid?: string
  password?: string
  login?: boolean
  twofa?: string
  headers?: object
  nonce?: () => number
  proxy?: string
  origin?: string
  userAgent?: string
  adjustForTimeDifference?: boolean
  requestOptions?: object
  asyncWrite?: boolean
  enableDeprecatedNonceTag?: boolean
  enableRateLimitStrictMode?: boolean
  createOrderRateLimit?: number
  useWeb3ForFetchingOrders?: boolean
  enableLiveUpdates?: boolean
}
