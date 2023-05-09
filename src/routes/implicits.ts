import e, { Request, Router } from 'express';
import { apiKeySecretMiddleware, ApiKeySecretRequest } from '../middlewares/authorization';
import {checkRequiredParameters, executeCcxtMethod, initCcxtClientForRest} from './helper';

const router = Router();

interface ImplicitApiRequest extends Request {
    query: {
        exchangeId: string;
        method: string;
        [key: string]: any;
    };
    body: {
        [key: string]: any;
    };
}

const handleRequest = async (req: ImplicitApiRequest & ApiKeySecretRequest, res) => {
    const { exchangeId, method, ...otherQueryParams } = req.query;
    const otherBodyParams = req.body;
    const { apiKey, secret } = req;

    if (!exchangeId || !method) {
        res.status(400).send('Missing required query parameters');
        return;
    }

    Promise.resolve()
        .then(() => checkRequiredParameters({exchangeId, method}))
        .then(() => initCcxtClientForRest(exchangeId, method, {apiKey, secret}))
        .then(exchange => executeCcxtMethod(exchange, method, ...{...otherQueryParams, ...otherBodyParams}))
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).send(error.toString()))
        .finally(() => res.end());
};

router.get('/public', apiKeySecretMiddleware, handleRequest);
router.post('/public', apiKeySecretMiddleware, handleRequest);
router.get('/private', apiKeySecretMiddleware, handleRequest);
router.post('/private', apiKeySecretMiddleware, handleRequest);

export default router;
