import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { getDate } from '../functions/getDate';
import WebReport from './WebReport';

 
const CreateEstadistics = () => {

    const [usersData, setUsersData] = useState([])
    const [actualDate, setActualDate] = useState(getDate())
    

     const getDataOfUsers = async () => { 
        const response = await axios.get("http://localhost:4000/users")
        const results = response.data
        setUsersData(results)
     }

     useEffect(() => { 
        getDataOfUsers()
     }, [])

     const generateAutomaticEstadistics = async () => {
      console.log("Creando nueva estadistica")
        try {
          const estadistics = usersData.map((us) => ({
            idEstadistica: uuidv4(),
            idJugador: us._id,
            nickName: us.nickName,
            picture: us.picture,
            fechaDeCreacion: actualDate,
            puntuacion: Math.floor(Math.random() * 100) + 1,
          }));
          const response = await axios.post("http://localhost:4000/estadistics", estadistics);
          console.log('Estadísticas enviadas correctamente:', response.data);
          localStorage.setItem('lastGenerationTime', JSON.stringify(new Date()));

        } catch (error) {
          console.error('Error al enviar estadísticas:', error);
        }
      };

      useEffect(() => {
        const estadisticsInterval = setInterval(() => {
            generateAutomaticEstadistics();
        },  59 * 60 * 1000); // 59 * 60 * 1000); 
        return () => clearInterval(estadisticsInterval);
      }, [usersData]);

    return (
    <div>
       <WebReport/>
    </div>
  )
}


export default CreateEstadistics
