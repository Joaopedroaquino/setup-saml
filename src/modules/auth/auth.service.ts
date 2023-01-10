import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/contracts/entities/user";
import { UserToken } from "../users/contracts/dtos/UserTokenDto";
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

  async login(user: LogingDto):Promise<UserToken> {
    const payload: UserPayload = {
      sub:user.id,
      emailcorporative: user.emailcorporative
    }
    const userNotExist = await this.userService.findByEmail(user.emailcorporative)
    if(!userNotExist?.id){
      throw new NotFoundException("User not exist Or Email incorrect!")
      
    }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

}
