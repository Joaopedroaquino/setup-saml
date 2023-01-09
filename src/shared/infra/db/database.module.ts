import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { postgres } from "./typeorm";




@Module({
    imports: [
        ConfigModule.forRoot({
            
            isGlobal: true,
            load: [
                () => ({
                    postgres,
                    app: {
                        port: process.env.APP_PORT || 3333
                    },

                })
            ]
        }),

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) =>
                config.get<TypeOrmModuleOptions>('postgres'),
        }),


       
    ]
})
export class DatabaseModule {
    constructor(/*private dataSource: DataSource*/) { }
}