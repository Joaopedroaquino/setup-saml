import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserUseCase } from 'src/modules/user/useCases/userUseCase';
import { User } from 'src/modules/user/contracts/entities/user';
import { jwtConstants } from '../utils/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userUseCase: UserUseCase) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
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
