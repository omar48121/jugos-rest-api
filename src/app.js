import express  from "express";
import cors from 'cors';
import productRoutes from './routes/products.routes.js';
import indexRoutes from './routes/index.routes.js';
import userRoutes from './routes/user.routes.js';
import logRoutes from './routes/log.routes.js';

const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        'http://127.0.0.1:5501',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5000',
        'https://shared-cranberry3690.netlify.app',
        '*'
    ]
}));
app.use(indexRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', logRoutes);
app.use(express.static('uploads'));

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    })
});

export default app;