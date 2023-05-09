import { Request, Router } from 'express';
import { apiKeySecretMiddleware, ApiKeySecretRequest } from '../middlewares/authorization';
import {checkRequiredParameters, executeCcxtMethod, initCcxtClientForRest} from './helper';

const router = Router();

interface OrdersRequest extends Request {
    query: {
        exchangeId: string;
        symbol?: string;
    };
}

router.get('/', apiKeySecretMiddleware, async (req: OrdersRequest & ApiKeySecretRequest, res) => {
    const { exchangeId, symbol } = req.query;
    const { apiKey, secret } = req;
    const method = 'fetchOrders'

    Promise.resolve()
        .then(() => checkRequiredParameters({exchangeId}))
        .then(() => initCcxtClientForRest(exchangeId, method, {apiKey, secret}))
        .then(exchange => executeCcxtMethod(exchange, method, symbol))
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).send(error.toString()))
        .finally(() => res.end());

});

export default router;
