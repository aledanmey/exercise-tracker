 /**
 * Alexandra Meyers 
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';
const EXERCISE_CLASS = 'Exercise';

let connection = undefined;
let Exercise = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
        Exercise = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}


// Defines a schema for the exercises, compiles and returns a model. 
// Returns a model object for the exerciseSchema
function createModel(){
    // Defines the schema
    const exerciseSchema = mongoose.Schema({
        name: {type: String, required: true},
        reps: {type: Number, required: true},
        weight: {type: Number, required: true},
        unit: {type: String, required: true},
        date: {type: String, required: true},
    });
    // Compile the model class from the schema.
    return mongoose.model(EXERCISE_CLASS, exerciseSchema);
}

async function createExercise(name, reps, weight, unit, date){
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, 
        date: date});
        // Call save to persist this as a document in MongoDB.
        return exercise.save();
}

async function findExercises(filter){
    const query = Exercise.find(filter);
    return query.exec();
}

async function replaceExercise(_id, name, reps, weight, unit, date){
    const result = await Exercise.replaceOne({_id: _id},
            {name: name, reps: reps, weight: weight, unit: unit, date: date});
    return result.modifiedCount;
}

async function deleteById(_id){
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
}
export { connect, createExercise, findExercises, replaceExercise, deleteById};