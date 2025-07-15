import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphModule } from './graph/graph.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [GraphModule, MongooseModule.forRoot('mongodb://127.0.0.1/graphs')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
