import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { UsersModule } from "./users/users.module";

export declare type DatabaseSupported =
  | "mysql"
  | "postgres"
  | "cockroachdb"
  | "sap"
  | "spanner"
  | "mariadb"
  | "sqlite"
  | "cordova"
  | "react-native"
  | "nativescript"
  // | "sqljs" // I don't know why not for it
  | "oracle"
  | "mssql"
  | "mongodb"
  | "aurora-mysql"
  | "aurora-postgres"
  | "expo"
  | "better-sqlite3"
  | "capacitor";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as DatabaseSupported,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize:
        !process.env.NODE_ENV || process.env.NODE_ENV === "production"
          ? false
          : true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
