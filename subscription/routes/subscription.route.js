import { Router } from "express";
import authorize from "../middelware/auth.middelware.js";
import { createsub, getUsersub } from "../controllers/subscription.controller.js";

const SubRouter =Router();


SubRouter.get('/',(req,res)=>res.send({title:'GET ALL SUBSCRIPTIONS'}));

SubRouter.get('/:id',(req,res)=>res.send({title:'GET  SUBSCRIPTIONS'}));

SubRouter.post('/',authorize,createsub);


SubRouter.put('/:id',(req,res)=>res.send({title:'Update SUBSCRIPTIONS'}));
SubRouter.put('/:id/cancel',(req,res)=>res.send({title:'Cancel SUBSCRIPTIONS'}));


SubRouter.delete('/:id',(req,res)=>res.send({title:'Delete SUBSCRIPTIONS'}));


SubRouter.get('/users/:id',authorize,getUsersub);


SubRouter.get('/upcoming-id',(req,res)=>res.send({title:'GET ALL SUBSCRIPTIONS of USer Upcoming'}));

export default SubRouter