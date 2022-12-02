import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserUseCase } from 'src/modules/user/useCases/userUseCase';
import { User } from 'src/modules/user/contracts/entities/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userUseCase: UserUseCase) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY
    });
  }

  async validate(payload: any) {
    const user: User | undefined = this.userUseCase.retrieveUser(payload.sub);

    if (user) {
      return user;
    }

    throw new ForbiddenException('user was not found');
  }
}
