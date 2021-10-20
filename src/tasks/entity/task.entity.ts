import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { TaskStatus } from '../task.status';

import { v4 as uuidV4 } from 'uuid';
import { User } from 'src/auth/entity/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
class Task {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Task };
