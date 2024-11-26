import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataResponseInterceptor } from './common/interceptor/data-response.interceptor';
import databaseConfig from './config/database.config';
import { PostTypeController } from './master-data/post-type/post-type.controller';
import { PostTypeModule } from './master-data/post-type/post-type.module';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: true,
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        host: configService.get('database.host'),
        autoLoadEntities: true,
        database: configService.get('database.name'),
      }),
    }),
    PostsModule,
    PostTypeModule,
  ],
  controllers: [AppController, PostsController, PostTypeController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
  ],
})
export class AppModule {}
