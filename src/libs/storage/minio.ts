import * as Minio from 'minio';
import { env } from '../env';

export const client = new Minio.Client({
  endPoint: env.STORAGE_URL,
  port: 9000,
  useSSL: false,
  accessKey: env.STORAGE_AK,
  secretKey: env.STORAGE_SK,
});

export const MinioClient = {
  presignedPutObject(fileName: string) {
    return new Promise<string>((resolve, reject) => {
      client.presignedPutObject('moments', fileName, (err, url) => {
        if (err) {
          return reject(err);
        }

        return resolve(url);
      });
    });
  },
};
