import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserUseCase } from '../user/useCases/userUseCase';
import { UserModule } from '../user/user.module';
import { UserTypeORMRepository } from '../users/infra/typeorm/repositories/UserTypeORMRepository';
import { RoutesModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { SamlAuthGuard } from './guards/saml-auth-guard';
import { JwtStrategy } from './strategy/jwt-strategy';
import { SamlStrategy } from './strategy/saml-strategy';
import { jwtConstants } from './utils/constants';

@Module({
    imports: [
        PassportModule,
        ConfigModule.forRoot(),
        forwardRef(() => RoutesModule),
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn:'1d'},
        }),
        RoutesModule,
        
    ],

    providers: [
        AuthService,
        SamlStrategy,
        SamlAuthGuard,
        JwtStrategy,
        JwtAuthGuard,
        UserTypeORMRepository, 
        UserUseCase
    ],

    exports: [AuthService, SamlStrategy]
})
export class AuthModule {}
