import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import connect from "./connection.js";
import router from "./routes/routers.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.static("./dist"));
app.use(express.json());

app.use("/api",router)
// Routers

app.all("/*", (req, res) => res.sendFile(path.resolve("./dist/index.html")));
connect()
    .then(()=>{
        app.listen(process.env.VITE_PORT, error => {
            if(error) return console.log(error);
            console.log(`Server started on port ${process.env.VITE_PORT}`);
            console.log("data base connected");
            
        });
    })
    .catch(e=>{
        console.log(e);
        
    })