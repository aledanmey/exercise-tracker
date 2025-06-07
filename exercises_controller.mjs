/**
 * Alexandra Meyers 
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

// Helper function to validate the request body. 
function isValidExercise(body){
    const keys = ['name', 'reps', 'weight', 'unit', 'date'];
    const allowedUnits = ['lbs', 'kgs'];
    const validDate = /^\d{4}-\d{2}-\d{2}$/;

    if (Object.keys(body).length !== 5) return false;

    for (let key of keys) {
        if (!(key in body)) return false;
    }

    if (typeof body.name !== 'string' || body.name.trim().length === 0) return false;
    if (!Number.isInteger(body.reps) || body.reps <= 0) return false;
    if (!Number.isInteger(body.weight) || body.weight <= 0) return false;
    if (!allowedUnits.includes(body.unit)) return false;
    if (!validDate.test(body.date)) return false;

    return true;
}


app.post('/exercises', asyncHandler(async (req, res) => {
    const body = req.body;

    if (!isValidExercise(body)) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    const doc = await exercises.createExercise(body.name, body.reps, body.weight, body.unit, body.date);
    res.status(201).json(doc);
}));


app.get('/exercises', asyncHandler(async (req, res) => {
    const docs = await exercises.findExercises({});
    res.status(200).json(docs);
}));


app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const docs = await exercises.findExercises({ _id });

    if (docs.length === 0) {
        return res.status(404).json({ Error: "Not found" });
    }

    res.status(200).json(docs[0]);
}));


app.put('/exercises/:_id', asyncHandler(async (req, res) => {
    const body = req.body;
    const { _id } = req.params;

    if (!isValidExercise(body)) {
        return res.status(400).json({ Error: "Invalid request" });
    }

    const count = await exercises.replaceExercise(_id, body.name, body.reps, body.weight, body.unit, body.date);
    if (count === 0) {
        return res.status(404).json({ Error: "Not found" });
    }

    res.status(200).json({ _id, ...body });
}));


app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const count = await exercises.deleteById(_id);

    if (count === 0) {
        return res.status(404).json({ Error: "Not found" });
    }

    res.status(204).send();
}));


app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});