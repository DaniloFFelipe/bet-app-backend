import { MinioClient } from './minio';

export class StorageService {
  async getPreSignedUrl(fileName: string) {
    return MinioClient.presignedPutObject(fileName);
  }
}
