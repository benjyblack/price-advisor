import config from '../../src/config';
import mongoose from 'mongoose';
mongoose.Promise = Promise;

export default function boot() {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.dbURI);

    const db = mongoose.connection;
    db.on('error', (err) => {
      console.error(`MongoError: ${err}`);
      reject(err);
    });

    db.once('open', () => {
      console.log('Connected to MongoDB!');
      resolve();
    });
  });
};