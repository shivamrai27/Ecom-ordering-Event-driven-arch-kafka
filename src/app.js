import express from 'express';
import orderRoutes from './api/orders.js';
const router = express.Router();
const app = express();

app.use(express.json());
router.post('/', orderRoutes);
app.use('/', router);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

