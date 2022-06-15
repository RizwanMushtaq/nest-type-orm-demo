import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<User[]> {
    await this.appService.createUser('Rizwan');
    return this.appService.getAll();
  }
}
