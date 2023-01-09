require('dotenv').config()
import * as path from 'path';
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const postgres: TypeOrmModuleOptions = {
    type: 'postgres',
    port:  Number(process.env.DB_PORT) || 5437,
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'root',
    password: String(process.env.DB_PASS || 'root'),
    database: process.env.DB_NAME || 'root',
    entities: [path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'modules',
        '**',
        'infra',
        'typeorm',
        'schemas',
        '*',
    ),
    ],
    synchronize: false,
    migrations: [path.resolve(__dirname, 'migrations', '*')],
    logging: ['error', 'warn']
};