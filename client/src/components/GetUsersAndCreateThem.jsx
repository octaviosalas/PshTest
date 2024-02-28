import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
 

const GetUsersAndCreateThem = () => {

      const [players, setPlayers] = useState([])

      const getTenPlayers = () => { 
        axios.get("https://randomuser.me/api/?results=10")
                .then((res) => { 
                    console.log("Todo: ",res.data.results)
                    const results = res.data.results
                    const justSomeData = results.map((res) => { 
                      const minimalName = res.name.first
                      const pic = res.picture.large
                      const idUnico = uuidv4()
                      return { 
                        nickName: minimalName,
                        picture: pic,
                        id: idUnico               
                      }
                    })
                    console.log("SomeData:", justSomeData)
                    setPlayers(justSomeData)
                })
                .catch((err) => { 
                    console.log(err)
                })
      }

      useEffect(() => { 
      getTenPlayers()
      console.log(players)
      }, [])

     const sendData = () => { 
       axios.post("http://localhost:4000/users/create", players)
             .then((res) => { 
              console.log(res.data)
             })
             .catch((err) => { 
              console.log(err)
             })
     }

  return (
    <div>
       <p className='font-bold text-black text-md underline' onClick={() => sendData()}>PSH TEST</p>
    </div>
  )
}

export default GetUsersAndCreateThem
