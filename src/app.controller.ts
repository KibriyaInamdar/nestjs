import { Controller, Get, Logger, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @Get()
  async getHello(): Promise<string> {
    this.logger.log('ghello');
    const greetings = await this.appService.getHello();
    return greetings;
  }

  @Get('/*')
  async getData(@Req() request: Request): Promise<string> {
    this.logger.log(request);
    this.logger.log('getting request');
    const graph = await this.appService.getData(request, request.url, '');
    return graph;
  }
}
