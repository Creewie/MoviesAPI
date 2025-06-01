import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;
console.log(MONGODB_URI);

const connectDB = async () => {
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB");
    }catch(err: unknown){
        if(err instanceof Error){
            console.error("Błąd połączenia z MongoDB", err)
        }else{
            console.log("Nieznany błąd", err);
        }
        process.exit(1);
    }
}

export default connectDB;