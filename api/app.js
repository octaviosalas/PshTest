import express from "express"
import cors from "cors"
import connectDataBase from "./database/connectDataBase.js"
import bodyParser from "body-parser"
import estadisticsRoutes from "./routes/estadistics.routes.js"
import userRoutes from "./routes/users.routes.js"


const app = express()
const PORT = 4000

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));


app.use('/estadistics', estadisticsRoutes);
app.use("/users/", userRoutes)

app.get('/', (req, res) => {
    res.send("Servidor levantado en Local.")
  })
  

app.listen(PORT, () => {
     console.log("Servidor de NodeJs/Express iniciado en el puerto 4000 ✔✔")
     connectDataBase() 
})