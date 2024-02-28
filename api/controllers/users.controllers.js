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



export const createNewRecomendation = async (req, res) => {
 
  const {nickName, category, title, duration, userName, UserEmail, userProfileImage, platform, score, date, movieImage, observation} = req.body
  console.log(req.body)

  try {
    const newRec = new Recomendations(req.body);
    const savedRec = await newRec.save();
    res.status(201).json(savedRec);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
    console.log(error)
  }
}