import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/contracts/entities/user";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getTokenForUser(user: User) {
    const payload = {
      sub: user.username,
      iss: user.issuer,
      
    };
    console.log(payload)

    return this.jwtService.sign(payload);
  }
}
