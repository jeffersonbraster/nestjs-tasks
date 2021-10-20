import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.status';

class UpdateTaskStatusDTO {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export { UpdateTaskStatusDTO };
