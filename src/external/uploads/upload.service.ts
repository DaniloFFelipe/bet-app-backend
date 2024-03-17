import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/libs/storage/storage.service';
import { GetPresignedUrlDto } from './dtos/get-presigned-url.dto';

@Injectable()
export class UploadService {
  constructor(private storage: StorageService) {}

  async getPresignedUrl({ fileName }: GetPresignedUrlDto) {
    const url = await this.storage.getPreSignedUrl(fileName);
    return { url };
  }
}
