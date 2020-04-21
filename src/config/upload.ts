import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const tempDirectory = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tempDirectory,
  storage: multer.diskStorage({
    destination: tempDirectory,
    filename: (request, file, callback) => {
      const filenameHash = crypto.randomBytes(8).toString('hex');
      const filename = `${filenameHash}-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
