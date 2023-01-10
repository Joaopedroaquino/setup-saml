import { Module } from "@nestjs/common";
import { UserTypeORMRepository } from "../../infra/typeorm/repositories/UserTypeORMRepository";

@Module({

    providers: [
         {
             provide: 'UserRepository',
             useClass: UserTypeORMRepository,
         },

    ],
    exports: [
         
         {
            provide: 'UserRepository',
            useClass: UserTypeORMRepository,
         },

    ],
})
export class RepositoriesModule { }