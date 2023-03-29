import express  from "express";
import productRoutes from './routes/products.routes.js';
import indexRoutes from './routes/index.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(express.json());
app.use(indexRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    })
});

export default app;