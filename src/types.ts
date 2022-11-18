export type Todo = {
  id: string;
  title: string;
  description: string;
  done: boolean;
  completionDate: string;
  attachedFiles?: string[];
};

export type AddAction = { type: 'add' };

export type EditAction = { type: 'edit'; id: string };
