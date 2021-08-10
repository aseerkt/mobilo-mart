import 'dotenv-safe/config';
import express from 'express';
import cors from 'cors';

// import routes
import userRoutes from './routes/users';
import { successLog } from './utils/chalkLogs';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_, res) => res.send('Welcome to Mobile Mart Server'));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(successLog(`Server listening: http://localhost:${PORT}`))
);
