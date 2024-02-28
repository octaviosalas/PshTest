import express from 'express';
const userRoutes = express.Router();
import  {createUser, getUsers} from '../controllers/users.controllers.js' 

userRoutes.post('/create', createUser);
userRoutes.get('/', getUsers);


export default userRoutes;