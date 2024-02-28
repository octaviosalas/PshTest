import express from 'express';
const userRoutes = express.Router();
import  {createUser} from '../controllers/users.controllers.js' 

userRoutes.post('/create', createUser);

export default userRoutes;