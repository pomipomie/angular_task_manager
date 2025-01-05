import { Project } from './project.interface';
import { taskStatus } from './taskStatus.enum';

export interface Task {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  users: string[];
  project: Project;
  status: taskStatus;
  dueDate: Date;
}
