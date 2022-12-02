import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SamlStrategy } from './strategy/saml-strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'test',
            signOptions: { expiresIn: '60s'}

        })
    ],

    providers: [
        AuthService,
        SamlStrategy
    ],

    exports: [AuthService, SamlStrategy]
})
export class AuthModule {}
