import { Module } from '@nestjs/common';
import { UserUseCase } from './useCases/userUseCase';

@Module({
    providers:[UserUseCase],
    exports:[UserUseCase]
})
export class UserModule {}
