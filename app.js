import express from 'express';
import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js'; 

const app = express();

app.get('/', (req, res) => {
  res.send("welcome");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
      