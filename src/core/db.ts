import mongoose from 'mongoose';
let database: mongoose.Connection;
export const connectToDatabase = () => {
  mongoose.connect(`${process.env.MONGO_URI}`);
  database = mongoose.connection;
  database.once('open', () => {
    console.log('DB Connected!');
  });

  // Uncomment this line to see mongoose queries in the console
  // mongoose.set('debug', true);
  database.on('error', () => {
    console.log('Error connecting to database');
    process.exit(1);
  });
};
