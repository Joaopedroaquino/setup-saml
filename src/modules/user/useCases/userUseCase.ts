import { Injectable } from '@nestjs/common';
import { Users } from 'src/modules/users/contracts/entities/users';
import { User } from '../contracts/entities/user';

@Injectable()
export class UserUseCase {
  private _store: Map<string, Users>;

  constructor() {
    this._store = new Map<string, Users>();
  }

  storeUser(user: Users): void {
    this._store.set(user.emailcorporative, user);
  }

  retrieveUser(id: string): Users | undefined {
    return this._store.get(id);
  }
}
