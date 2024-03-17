import { Module } from '@nestjs/common';
import { GetPresignedUrlController } from './uploads/controllers/get-presign-url.controller';
import { UploadService } from './uploads/upload.service';

@Module({
  controllers: [GetPresignedUrlController],
  providers: [UploadService],
})
export class ExternalModule {}
