import express from 'express';
const estadisticsRoutes = express.Router();

import  { createEstadistics, getEstadistics} from '../controllers/estadistics.controllers.js' 

estadisticsRoutes.get('/', getEstadistics);
estadisticsRoutes.post('/', createEstadistics);



export default estadisticsRoutes;