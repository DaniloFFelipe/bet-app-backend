import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/libs/zod/pipe/zod-validation.pipe';
import { RequestAuthCodeDto, RequestAuthCodeDtoSchema } from '../users.dto';
import { Public } from 'src/libs/auth/auth.type';
import { UsersService } from '../services/users-impl.service';

@Controller('sessions/auth/request-code')
export class RequestAuthCodeController {
  constructor(private readonly service: UsersService) {}

  @Public()
  @Post('/')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(RequestAuthCodeDtoSchema))
  async handle(@Body() data: RequestAuthCodeDto) {
    return await this.service.requestAuthCode(data);
  }
}
