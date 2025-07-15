import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose'

@Schema()
export class Graph{
    @Prop({required: true})
    title: String;

    @Prop({required: true})
    X_Values: [Number];

    @Prop({required: true})
    Y_Values: [Number];
}

export const GraphSchema = SchemaFactory.createForClass(Graph);