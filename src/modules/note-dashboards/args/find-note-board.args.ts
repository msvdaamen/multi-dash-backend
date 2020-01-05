import {ArgsType, Field, Int} from 'type-graphql';
import {IsNotEmpty, Min} from 'class-validator';

@ArgsType()
export class FindNoteBoardArgs {
    @Field(type => Int)
    @Min(1)
    @IsNotEmpty()
    id: number;
}
