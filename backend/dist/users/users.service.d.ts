import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private users;
    create(createUserDto: CreateUserDto): User;
    findAll(): User[];
    findOne(id: number): User;
    update(id: number, updateUserDto: UpdateUserDto): User;
    remove(id: number): boolean;
}
