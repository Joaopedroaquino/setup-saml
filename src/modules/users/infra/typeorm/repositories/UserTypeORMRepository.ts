import { Injectable } from "@nestjs/common"
import { User } from "src/modules/user/contracts/entities/user"
import { Users } from "src/modules/users/contracts/entities/users"
import { IUserRepository } from "src/modules/users/contracts/repositories/IUserRepository"
import { DataSource, Repository } from "typeorm"
import { UserSchema } from "../schemas/UserSchema"




@Injectable()
export class UserTypeORMRepository implements IUserRepository {
    private ormRepository: Repository<UserSchema>
    constructor(dataSource: DataSource) {
        this.ormRepository = dataSource.getRepository(UserSchema)
    }
 public async   findByEmail(emailcorporative: string): Promise<Users> {
        return await this.ormRepository.findOneBy({ emailcorporative });
       
    }
   

   



}

