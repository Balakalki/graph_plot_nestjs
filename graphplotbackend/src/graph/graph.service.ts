import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { GRAPH_MODEL } from './constants';
import { InjectModel } from '@nestjs/mongoose';
import { Graph } from 'src/schemas/Graph.schema';
import { CreateGraphDto } from './dto/create-graph.dto';

@Injectable()
export class GraphService {
    constructor(
    @InjectModel(Graph.name) private graphModel: Model<Graph>,
  ) {}

  async create(createGraphDto: CreateGraphDto): Promise<Graph> {
    const createdGraph = new this.graphModel(createGraphDto);
    return createdGraph.save();
  }

  async findAll(): Promise<Graph[]> {
    return this.graphModel.find();
  }
}
