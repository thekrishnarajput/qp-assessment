import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import moment from 'moment';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

// Modules import
import connect from './db';
import { adminRouter } from './admin/routes/admin.routes';
import { autoCreateAdminController } from './admin/controllers/admin.controller';

// Initialize the express app
const app = express();

const host: string = 'http://127.0.0.1';

const { PORT } = process.env;

/* App Configuration */

// Initialize the DB
connect;

// helmet() adds security related http headers
app.use(helmet());

// cors() enables cross domain requests
app.use(cors());

// express.json() parses incoming bodies request into JSON
app.use(express.json());

// Define a custom function to format date and time in IST zone
morgan.token('date-ist', () => {
    return moment().utcOffset(330).format('YYYY-MM-DD HH:mm:ss');
});

const logFormat = 'Method::method, Route::url, Status-code::status, Request-time:[:date-ist] Res::res[content-length] - Response-time::response-time ms';

// Use morgan middleware for logging HTTP requests with custom and specified format
app.use(morgan(logFormat));

/*  Routing */

app.use('/api/admin', adminRouter);

// app.use('/api/user', adminRouter);

// app.use('/api/item', adminRouter);

/* Server initialization */

app.listen(PORT, () => {
    autoCreateAdminController();
    console.log(`Server is running on ${host}:${PORT}`);
});