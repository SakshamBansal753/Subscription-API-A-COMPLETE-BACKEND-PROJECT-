import express from 'express'
import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import SubRouter from './routes/subscription.route.js';
import connectTodata from './Database/moongodb.js';
import errorMiddel from './middelware/error.middelware.js';
import cookieParser from 'cookie-parser';
import arcjectmiddel from './middelware/arcjet.middelware.js';

const app=express();
//api/v1/auth
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/sub',SubRouter);

app.use(errorMiddel);


app.get('/',(req,res)=>{
    res.send("welcome to this API")
});
app.listen(PORT, async ()=>{
    console.log(`server is rummig on http://localhost:${PORT}`)

    await connectTodata()
});
export default app ;