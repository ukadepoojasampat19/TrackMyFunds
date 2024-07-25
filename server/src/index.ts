//PWD:hjsdfbucvdc
//username:pooja
//mongodb+srv://pooja:hjsdfbucvdc@personalfinancetracker.3cse6jg.mongodb.net/
import express, { Express } from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-record";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());  
app.use(cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type"], // Allow specific headers
}));                                              

const mongoURI: string = "mongodb+srv://pooja:hjsdfbucvdc@personalfinancetracker.3cse6jg.mongodb.net/";
mongoose
    .connect(mongoURI, {
        serverSelectionTimeoutMS: 5000,
    })
    .then(() => console.log("connectde to mongodb"))
    .catch((err) => console.log("Failed to connect to mongodb :", err));


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/financial-record", financialRecordRouter);
app.listen( port , () =>
{
    console.log(`server is running on port ${port}`);
})