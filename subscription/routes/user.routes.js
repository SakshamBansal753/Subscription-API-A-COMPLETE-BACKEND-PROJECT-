import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from '../middelware/auth.middelware.js'
const userRouter =Router();
//A Different Technique To optimise routes in app.js for User Route
userRouter.get('/',getUsers);

// Here:id is for like passing Key in your API and for particular user
userRouter.get('/:id',authorize,getUser);


userRouter.post('/',(req,res)=>  res.send({message:'Create  user'}));


userRouter.put('/:id',(req,res)=>  res.send({message:' UPDATE user'}));


userRouter.delete('/:id',(req,res)=>  res.send({message:'Delete user'}));

export default userRouter;