import mongoose from "mongoose";


const usersSchema = mongoose.Schema({ 
    nickName: { 
        type: String
    }, 
    picture: { 
        type: String
    }, 
    id: { 
        type: String
    }  
})

const Users = mongoose.model("users", usersSchema)

export default Users;


