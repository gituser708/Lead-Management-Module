import mongoose from "mongoose";

const db = () => mongoose.connect(process.env.MongoDB_URI).then((res) => {
    console.log(`MongoDB Conneced to ${res.connection.name}`);
}).catch((err) => {
    console.log('Error to connect MongoDB!');
    console.error(err);
});

export default db;