import Users from "../models/users.model.js";


export const createUser = async (req, res) => { 
  try {
    const usersData = req.body;  
    const usersSaved = await Users.insertMany(usersData);
    res.status(201).json(usersSaved);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear los usuarios' });
    console.log(error);
  }
}


export const getUsers = async (req, res) => { 
  try {
    const usersData = await Users.find()  
    res.status(201).json(usersData);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear los usuarios' });
    console.log(error);
  }
}


