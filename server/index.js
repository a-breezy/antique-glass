import express from "express";
import mongoose from "mongoose";
import cors from 'cors'

// move to .env
import { PORT, mongoDBUrl } from "./config.js";
import { Glass } from './models/glassModel.js'
import glassRoutes from './routes/glassRoutes.js';

const app = express();

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.get('/', (req,res) => {
    console.log(req)
    return res.status(234).send('MERN Tutorial')
});

app.use('/glass', glassRoutes)

mongoose.connect(mongoDBUrl)
    .then(() => {
        console.log('App connected to database')
        app.listen(PORT, () => {
        console.log(`App is listening on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })