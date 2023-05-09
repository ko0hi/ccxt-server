import { Router } from 'express';
import myTradesRouter from './myTrades';
import positionsRouter from './positions';
import createOrderRouter from "./createOrder";
import ordersRouter from './orders'
import implicitApiRouter from './implicits'

const router = Router();

// 各エンドポイントに対応するルーターをマウント
router.use("/v1/createOrder", createOrderRouter);
router.use("/v1/myTrades", myTradesRouter);
router.use("/v1/positions", positionsRouter);
router.use("/v1/orders", ordersRouter)
router.use("/v1/implicits", implicitApiRouter)
// 他のルーターもマウント
// ...

export default router;
