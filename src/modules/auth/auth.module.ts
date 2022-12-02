import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { SamlAuthGuard } from './guards/saml-auth-guard';
import { JwtStrategy } from './strategy/jwt-strategy';
import { SamlStrategy } from './strategy/saml-strategy';
import { jwtConstants } from './utils/constants';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret:  jwtConstants.secret,
            signOptions: { expiresIn: '60s'}

        }),
        UserModule
    ],

    providers: [
        AuthService,
        SamlStrategy,
        SamlAuthGuard,
        JwtStrategy,
        JwtAuthGuard
    ],

    exports: [AuthService, SamlStrategy]
})
export class AuthModule {}
