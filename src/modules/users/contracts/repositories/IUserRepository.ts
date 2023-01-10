import { User } from "src/modules/user/contracts/entities/user";
import { Users } from "../entities/users";


export interface IUserRepository {

   findByEmail(emailcorporative: string): Promise<Users>
   
 }