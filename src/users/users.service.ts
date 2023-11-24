import { Injectable } from '@nestjs/common';
import { User } from 'src/__types/user_type';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 0,
      username: 'admin',
      password: 'admin',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}