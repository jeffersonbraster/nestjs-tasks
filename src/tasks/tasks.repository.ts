import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetTasksDTO } from './dto/getTasksDTO';
import { TaskDTO } from './dto/TaskDTO';
import { Task } from './entity/task.entity';
import { TaskStatus } from './task.status';

@EntityRepository(Task)
class TasksRepository extends Repository<Task> {
  async getTasks(filterDTO: GetTasksDTO, user: User): Promise<Task[]> {
    const { status, search } = filterDTO;

    const queryTasks = this.createQueryBuilder('task');

    queryTasks.where({ user });

    if (status) {
      queryTasks.andWhere('task.status = :status', { status });
    }

    if (search) {
      queryTasks.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await queryTasks.getMany();

    return tasks;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.findOne({ where: { id, user } });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async createTask(taskDTO: TaskDTO, user: User): Promise<void> {
    const { title, description } = taskDTO;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
  }

  async updateStatusTask(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;

    await this.save(task);

    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const task = await this.delete({ id, user });

    if (task.affected === 0) {
      throw new NotFoundException();
    }
  }
}

export { TasksRepository };
