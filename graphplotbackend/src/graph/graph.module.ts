import { Module } from '@nestjs/common';
import { GraphController } from './graph.controller';
import { GraphService } from './graph.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Graph, GraphSchema } from 'src/schemas/Graph.schema';

@Module({
    imports: [MongooseModule.forFeature([{
        name: Graph.name,
        schema: GraphSchema,
    }])],
    controllers:[GraphController],
    providers:[GraphService]
})
export class GraphModule {}
