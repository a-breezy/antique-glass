import express, { response } from "express";
// move to .env
import { PORT, mongoDBUrl } from "./config.js";
import mongoose from "mongoose";
import { Glass } from './models/glassModel.js'

const app = express();

app.use(express.json())

app.get('/', (req,res) => {
    console.log(req)
    return res.status(234).send('MERN Tutorial')
});

// create new glass
app.post('/glass', async (req, res) => {
try {

    if (
        !req.body.title ||
        !req.body.availability ||
        !req.body.price ||
        !req.body.quantity
    ) {
        return res.status(400).send({
            message: 'Send all required fields: title, availability, price, and quantity'
        })
    }

    // testing glass creation
    const newGlass = {
        title: req.body.title,
        availability: req.body.availability,
        price: req.body.price,
        quantity: req.body.quantity,
    };

    const glass = await Glass.create(newGlass)

    return res.status(201).send(glass)
    
} catch (error) {
    console.log(error.message)
    response.status(500).send({message: error.message})
}
})

// get all glasses from db
app.get('/glasses', async (req,res) => {
    try {
        const glasses = await Glass.find({})

        return res.status(200).json({
            count: glasses.length,
            data: glasses
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

// get one glass from db
app.get('/glass/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const glass = await Glass.findById(id)

        return res.status(200).json(glass)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

// update glass
app.put('/glass/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.availability ||
            !req.body.price ||
            !req.body.quantity
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, availability, price, and quantity'
            })
        }

        const {id} = req.params.id;
        const result = await Glass.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({message: "Glass not found"})
        }
        return res.status(200).send({message: 'Glass successfully updated'})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

// route to delete book
app.delete('/glass/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Glass.findByIdAndDelete(id);
        if(!result) {
            return res.status(404).json({message: "Glass not found"});
        }
        return res.status(200).send({message: "Glass deleted successfully"})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

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