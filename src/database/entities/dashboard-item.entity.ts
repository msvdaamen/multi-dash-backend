import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Field, ObjectType} from 'type-graphql';
import {UserDashboardItem} from './user-dashboard-item.entity';
import {User} from './user.entity';

@ObjectType()
@Entity({name: 'dashboard_items'})
export class DashboardItem {

    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => [User])
    users: User[];

    @OneToMany(() => UserDashboardItem, userDashboardItem => userDashboardItem.users)
    userConnection: Promise<User[]>;
}
