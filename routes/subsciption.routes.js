import { Router } from 'exppress';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({body: {title: 'Get All subscriptions'}}));

export default subscriptionRouter;