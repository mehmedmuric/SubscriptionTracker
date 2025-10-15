import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sing-up', (req, res) => res.send {body: { title: 'Sing up'}});
authRouter.post('/sing-in', (req, res) => res.send {body: { title: 'Sing in'}});
authRouter.post('/sing-out', (req, res) => res.send {body: { title: 'Sing out'}});


export default authRouter;