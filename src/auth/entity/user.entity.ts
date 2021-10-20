import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Task } from 'src/tasks/entity/task.entity';
import { v4 as uuidV4 } from 'uuid';

@Entity()
class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
