import { IsNotEmpty } from 'class-validator';

class TaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export { TaskDTO };
