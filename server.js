import express from 'express';
import userRoutes from './routes/userRoutes.js';
import timeRoutes from './routes/timeRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import loginRoutes from './routes/authRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/times', timeRoutes);
app.use('/events', eventRoutes);
app.use('/auth', loginRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


