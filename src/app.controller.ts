import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { SamlStrategy } from './modules/auth/strategy/saml-strategy';
import { UserUseCase } from './modules/user/useCases/userUseCase';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private authService: AuthService,
    private userUsecase: UserUseCase,
    private samlStrategy: SamlStrategy 
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
