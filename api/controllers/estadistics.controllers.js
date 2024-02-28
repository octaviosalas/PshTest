import Estadistics from "../models/estadistic.model.js";

export const createEstadistics = async (req, res) => { 
    try {
        const estadisticsToBeSaved = req.body;  
        const estadisticsSaved = await Estadistics.insertMany(estadisticsToBeSaved);
        res.status(201).json(estadisticsSaved);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear las estadisticas' });
        console.log(error);
      }
}

export const getEstadistics = async (req, res) => { 
  try {
      const allEstadistics = await Estadistics.find()
      res.status(201).json(allEstadistics);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las Estadisticas' });
      console.log(error);
    }
}

