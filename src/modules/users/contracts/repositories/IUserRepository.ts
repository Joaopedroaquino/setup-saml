import { User } from "src/modules/user/contracts/entities/user";


export interface IUserRepository {

   findByEmail(emailcorporative: string): Promise<User>
   
 }