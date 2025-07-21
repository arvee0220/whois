import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhoisModule } from './whois/whois.module';

@Module({
  imports: [WhoisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
