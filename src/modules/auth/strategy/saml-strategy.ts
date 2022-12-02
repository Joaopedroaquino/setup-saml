import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from '@node-saml/passport-saml/lib';
import { User } from "@node-saml/passport-saml/lib/types";



@Injectable()
export class SamlStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      issuer: '',
      callbackUrl: '',
      cert: '',
      entryPoint: '',
      wantAssertionsSigned: true,
    });
  }

  async validate(profile: Profile) {
    try {
      const user: User = {
        username: profile['urn:oid:0.9.2342.19200300.100.1.1'] as string,
        email: profile.mail as string,
        issuer: profile.issuer as string,
        phone: profile['urn:oid:2.5.4.20'] as string,
      };
      return user;
    } catch (e) {
      throw new ForbiddenException('invalid user attributes');
    }
  }
}
