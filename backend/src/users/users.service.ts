import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Smith',
      username: 'johnsmith',
      email: 'john.smith@email.com',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      username: 'sarahjohnson',
      email: 'sarah.johnson@email.com',
    },
    {
      id: 3,
      name: 'Michael Brown',
      username: 'michaelbrown',
      email: 'michael.brown@email.com',
    },
    {
      id: 4,
      name: 'Emily Davis',
      username: 'emilydavis',
      email: 'emily.davis@email.com',
    },
    {
      id: 5,
      name: 'David Wilson',
      username: 'davidwilson',
      email: 'david.wilson@email.com',
    },
    {
      id: 6,
      name: 'Jessica Miller',
      username: 'jessicamiller',
      email: 'jessica.miller@email.com',
    },
    {
      id: 7,
      name: 'Christopher Garcia',
      username: 'christophergarcia',
      email: 'christopher.garcia@email.com',
    },
    {
      id: 8,
      name: 'Amanda Martinez',
      username: 'amandamartinez',
      email: 'amanda.martinez@email.com',
    },
    {
      id: 9,
      name: 'Matthew Anderson',
      username: 'matthewanderson',
      email: 'matthew.anderson@email.com',
    },
    {
      id: 10,
      name: 'Ashley Taylor',
      username: 'ashleytaylor',
      email: 'ashley.taylor@email.com',
    },
    {
      id: 11,
      name: 'Daniel Thomas',
      username: 'danielthomas',
      email: 'daniel.thomas@email.com',
    },
    {
      id: 12,
      name: 'Jennifer Jackson',
      username: 'jenniferjackson',
      email: 'jennifer.jackson@email.com',
    },
    {
      id: 13,
      name: 'Robert White',
      username: 'robertwhite',
      email: 'robert.white@email.com',
    },
    {
      id: 14,
      name: 'Lisa Harris',
      username: 'lisaharris',
      email: 'lisa.harris@email.com',
    },
    {
      id: 15,
      name: 'James Martin',
      username: 'jamesmartin',
      email: 'james.martin@email.com',
    },
    {
      id: 16,
      name: 'Michelle Thompson',
      username: 'michellethompson',
      email: 'michelle.thompson@email.com',
    },
    {
      id: 17,
      name: 'William Garcia',
      username: 'williamgarcia',
      email: 'william.garcia@email.com',
    },
    {
      id: 18,
      name: 'Kimberly Martinez',
      username: 'kimberlymartinez',
      email: 'kimberly.martinez@email.com',
    },
    {
      id: 19,
      name: 'Charles Robinson',
      username: 'charlesrobinson',
      email: 'charles.robinson@email.com',
    },
    {
      id: 20,
      name: 'Donna Clark',
      username: 'donnaclark',
      email: 'donna.clark@email.com',
    },
  ];

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: Math.max(...this.users.map(u => u.id)) + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };
    
    return this.users[userIndex];
  }

  remove(id: number): boolean {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    
    this.users.splice(userIndex, 1);
    return true;
  }
}
