import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Сервер ювелирного интернет-магазина, интерфейс доступен по ссылке <a href="http://localhost:4200">localhost:4200</a>';
  }
}
