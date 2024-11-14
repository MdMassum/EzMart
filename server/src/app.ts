import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import errorMiddleware from './middleware/error';
import authRouter from './routes/authRoutes'
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';


const app = express();

app.use(rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 20,
   message: "Too many attempts from this IP, please try again later.",
   })); // Rate limiting

app.use(helmet());
app.use(rateLimit({}))

app.use(cors({
    origin:'http://localhost:5173',     // frontend url
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

// routes

app.use('/api/auth',authRouter)

// error check 
app.use(errorMiddleware)

export default app