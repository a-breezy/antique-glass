import express from "express";
// move to .env
import { PORT } from "./config.js";

const app = express();

app.get('/', (req,res) => {
    console.log(req)
    return res.status(234).send('MERN Tutorial')
});

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`)
})