import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.status';

class GetTasksDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}

export { GetTasksDTO };
