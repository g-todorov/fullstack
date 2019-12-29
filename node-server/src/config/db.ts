import mongoose from 'mongoose';
import bluebird from 'bluebird';

import seedDatabase from '../utils/data-seeder';
import { MONGODB_URI } from '../utils/secrets';

const connectToDB = () => {
  mongoose.Promise = bluebird;

  mongoose.connect(MONGODB_URI, { useMongoClient: true }).then(
    () => {
      /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
      if (process.env.NODE_ENV !== 'production') {
        seedDatabase();
      }
    },
  ).catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    // process.exit();
  });
};

export default connectToDB;
