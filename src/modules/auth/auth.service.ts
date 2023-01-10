import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/contracts/entities/user";
import { Users } from "../users/contracts/entities/users";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getTokenForUser(user: Users) {
    const payload = {
      sub: user.emailcorporative,
      iss: user.issuer,
      
    };
    console.log(payload)

    return this.jwtService.sign(payload);
  }
}
