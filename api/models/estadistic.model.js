import mongoose from "mongoose";


const estadisticsModel = mongoose.Schema({ 
    fechaDeCreacion: { 
        type: String
    }, 
    idEstadistica: { 
        type: String
    }, 
    idJugador: { 
        type: String
    },
    nickName: { 
        type: String
    }, 
    picture: { 
        type: String
    }, 
    puntuacion: { 
        type: Number
    }
})

const Estadistics = mongoose.model("Estadistics", estadisticsModel)

export default Estadistics;


