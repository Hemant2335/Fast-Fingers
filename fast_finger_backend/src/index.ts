import express , {Request , Response , Application} from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import item from '../models/Paragraph';
import { Server } from 'http';
import { config } from 'dotenv';
const app : Application = express();

config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/FingerFast';

// Settings
app.use(cors());

// Routes
app.get('/',async (req : Request , res : Response)=>{
    try {
        const Item = await item.find({});
        console.log(Item);
        res.json(Item);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
    
})

// Database Setup
mongoose.connect(MONGO_URI) 
{
    console.log("database connected")
}

// Start server
const port : Number = Number(process.env.PORT) || 4000;

const server : Server = app.listen(port , () => {
    console.log(`Server on port ${port}`);
})

