import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes'; 
import checkDBConnection from './utils/checkDB';

dotenv.config();

checkDBConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes); 

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
