import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WhoisModule } from "./whois/whois.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        WhoisModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
