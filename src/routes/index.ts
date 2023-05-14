import { Router } from 'express'
import marketsRouter from './markets'
import myTradesRouter from './myTrades'
import positionsRouter from './positions'
import createOrderRouter from './createOrder'
import cancelOrderRouter from './cancelOrder'
import ordersRouter from './orders'
import editOrderRouter from './editOrder'
import implicitApiRouter from './implicits'
import passExchangeIdMiddleware from '../middlewares/exchangeId'

const router = Router()

router.use('/:exchangeId/v1/markets', passExchangeIdMiddleware, marketsRouter)
router.use('/:exchangeId/v1/createOrder', passExchangeIdMiddleware, createOrderRouter)
router.use('/:exchangeId/v1/cancelOrder', passExchangeIdMiddleware, cancelOrderRouter)
router.use('/:exchangeId/v1/editOrder', passExchangeIdMiddleware, editOrderRouter)
router.use('/:exchangeId/v1/myTrades', passExchangeIdMiddleware, myTradesRouter)
router.use('/:exchangeId/v1/positions', passExchangeIdMiddleware, positionsRouter)
router.use('/:exchangeId/v1/orders', passExchangeIdMiddleware, ordersRouter)
router.use('/:exchangeId/v1/implicits', passExchangeIdMiddleware, implicitApiRouter)

export default router
