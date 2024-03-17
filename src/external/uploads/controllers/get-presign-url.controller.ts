import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { Public } from 'src/libs/auth/auth.type';
import { UploadService } from '../upload.service';
import { GetPresignedUrlDto } from '../dtos/get-presigned-url.dto';

@Controller('/upload/presigned')
export class GetPresignedUrlController {
  constructor(private readonly service: UploadService) {}

  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async handle(@Query() data: GetPresignedUrlDto) {
    return await this.service.getPresignedUrl(data);
  }
}
