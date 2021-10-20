import { Get, Injectable, NotFoundException, Param } from '@nestjs/common';
import { TaskStatus } from './task.status';
import { TaskDTO } from './dto/TaskDTO';
import { GetTasksDTO } from './dto/getTasksDTO';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { User } from 'src/auth/entity/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDTO: GetTasksDTO, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDTO, user);
  }

  getTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.getTaskById(id, user);
  }

  createTask(taskDTO: TaskDTO, user: User): Promise<void> {
    return this.tasksRepository.createTask(taskDTO, user);
  }

  deleteTask(id: string, user: User): Promise<void> {
    return this.tasksRepository.deleteTask(id, user);
  }
  updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    return this.tasksRepository.updateStatusTask(id, status, user);
  }
}
