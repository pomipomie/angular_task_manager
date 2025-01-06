import { taskStatus } from './taskStatus.enum';

export interface Project {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  users: string[];
  status: taskStatus;
  dueDate: Date;
}

export type ProjectPayload = Omit<
  Project,
  'createdAt' | 'updatedAt' | 'id' | 'users' | 'dueDate'
> & {
  dueDate: Date | string;
};
