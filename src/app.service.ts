import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // http://localhost:3000/ - серверная часть
    return 'Сервер ювелирного интернет-магазина, интерфейс доступен по ссылке <a href="http://localhost:4200">localhost:4200</a> Swagger доступен по ссылке <a href="http://localhost:3000/api/">localhost:3000/api/</a>';
  }
}
