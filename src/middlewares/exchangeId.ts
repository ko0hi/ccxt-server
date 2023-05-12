// 親ルーターでパスパラメータを子ルーターに渡すミドルウェア
const passExchangeIdMiddleware = (req, res, next) => {
  const exchangeId = req.params.exchangeId
  if (!exchangeId) {
    throw new Error('exchangeId is required')
  }
  req.exchangeId = exchangeId
  next()
}

export default passExchangeIdMiddleware
