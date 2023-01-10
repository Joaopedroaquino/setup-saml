import { BadGatewayException, Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { IUpdateUserDTO } from "src/modules/user/contracts/dtos/IUpdateUserDTO";
import { IParamsListDTO } from "src/modules/user/contracts/dtos/IParamsListDTO";
import { IReturnUserParamsDTO } from "src/modules/user/contracts/dtos/IReturnUserParamsDTO";
import { createQueryBuilder, DataSource, ILike, Repository } from "typeorm";
import { ICreateUsertDTO } from "../../../contracts/dtos/ICreateUserDTO";
import { IReturnUsertDTO } from "../../../contracts/dtos/IReturnUserDTO";
import { User } from "../../../contracts/entities/User";
import { IUserRepository } from "../../../contracts/repositories/IUserRepository";
import { UserSchema } from "../schemas/User";
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserTypeORMRepository implements IUserRepository {
    private ormRepository: Repository<UserSchema>
    constructor(dataSource: DataSource) {
        this.ormRepository = dataSource.getRepository(UserSchema)
    }
   
    public async update(id: number, body: IUpdateUserDTO): Promise<boolean> {
        const result = await this.ormRepository.update({
            id
        }, body)
        return !!result.affected
    }
    public async remove(id: number): Promise<boolean> {
        const result = await this.ormRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException(
                'A user with the given ID was not found'
            )
        }
        return !!result.affected
    }

    public async create(user: ICreateUsertDTO): Promise<User> {
        return await this.ormRepository.save(this.ormRepository.create(user))
    }

    public async list({
        params = "",
        amount = 0,
        page = 1
    }: IParamsListDTO): Promise<IReturnUserParamsDTO> {
        let offset = page <= 0 ? 0 : page - 1
        const limit = amount <= 0 ? 10 : amount

        const [user, count] = await this.ormRepository
             .createQueryBuilder("userSchema")
            .select(["userSchema.emailcorporative", "userSchema.person_id", "userSchema.profile_id", "userSchema.id"])
            .leftJoinAndSelect("userSchema.person", "personSchema")
            .leftJoinAndSelect("userSchema.profile", "profileSchema")
            .orWhere("userSchema.emailcorporative ILIKE :emailcorporative", { emailcorporative: `%${params}%` })
            .orWhere("personSchema.name ILIKE :name", { name: `%${params}%` })
            .orWhere("personSchema.cpf ILIKE :cpf", { cpf: `%${params}%` })
            .orWhere("personSchema.cnpj ILIKE :cnpj", { cnpj: `%${params}%` })
            .orderBy("userSchema.emailcorporative", "ASC")
            .skip(limit * offset)
            .take(amount)
            .getManyAndCount()
           
           
            const res: IReturnUserParamsDTO = {count:count, user: user}
            return res

    }

    public async findByEmail(emailcorporative: string) {
        return this.ormRepository.findOneBy({ emailcorporative });
    }

    public async findByPersonId(person_id: number) {
        return this.ormRepository.findOneBy({ person_id });
    }

    public async findByProfileId(profile_id: number): Promise<IReturnUsertDTO> {
        return this.ormRepository.findOneBy({ profile_id });
    }



}

