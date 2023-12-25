import 'dotenv/config';
import app from './core/express';
import config from './config/config';
import { connectToDatabase } from './core/db';

connectToDatabase();

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log('Server Is Running on PORT', PORT);
});
