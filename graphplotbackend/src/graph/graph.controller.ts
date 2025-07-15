import { Body, Controller, Get, Post } from '@nestjs/common';
import { GraphService } from './graph.service';
import { CreateGraphDto } from './dto/create-graph.dto';

@Controller('graph')
export class GraphController {
    constructor(private graphService:GraphService) {}

    @Post()
    create(@Body() createGraphDto:CreateGraphDto){
        return this.graphService.create(createGraphDto);
    }

    @Get()
    findAll(){
        return this.graphService.findAll();
    }
}
