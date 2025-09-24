import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import express from 'express';
import cors from 'cors';
import db from './DB/db.js';
import errHandler from './Middleware/errHandler.js';
import leadFormRoute from './Routes/LeadFormRoute.js';

const app = express();

//! Cors setup
app.use(
  cors({
    origin: 'https://lead-management-module-neon.vercel.app',
  })
);

//! express middleware for passing incoming json request
app.use(express.json());

//! routes
app.use('/', leadFormRoute);
app.use('/', errHandler);

//! start the server
const PORT = 5000 || process.env.PORT;

Promise.all([db()]).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
}).catch((err) => {
    console.error(err);
});