export type Todo = {
  id: string;
  title: string;
  done: boolean;
  description?: string;
  completionDate?: string;
  attachedFiles?: string[];
};
