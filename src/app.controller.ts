import {  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Response,} from '@nestjs/common';
import { resolve } from 'path';
import express from 'express';


import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { SamlStrategy } from './modules/auth/strategy/saml-strategy';
import { UserUseCase } from './modules/user/useCases/userUseCase';
import { User } from './modules/user/contracts/entities/user';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private authService: AuthService,
    private userUsecase: UserUseCase,
    private samlStrategy: SamlStrategy 
    ) {}

    @Get()
    async homepage(@Response() res: express.Response) {
      res.sendFile(resolve('web/index.html'));
    }
  
    @Get('api/auth/sso/saml/login')
    @UseGuards()
    async samlLogin() {
      //rota tratada pelo passport-saml
      return;
    }
  
    @Post('api/auth/sso/saml/ac')
    @UseGuards()
    async samlAssertionConsumer(
      @Request() req: express.Request,
      @Response() res: express.Response,
    ) {
      //rota executada em uma declaração bem sucedida do idp
      if (req.user) {
        const user = req.user as User;
        const jwt = this.authService.getTokenForUser(user);
        this.userUsecase.storeUser(user);
        this, res.redirect('/?jwt=' + jwt);
      }
    }
  
    @UseGuards()
    @Get('api/profile')
    getProfile(@Request() req: any) {
      return req.user;
    }
  
    @Get('api/auth/sso/saml/metadata')
    async getSpMetadata(@Response() res: express.Response) {
      const ret = this.samlStrategy.generateServiceProviderMetadata(null, null);
      res.type('application/xml');
      res.send(ret);
    }
}
