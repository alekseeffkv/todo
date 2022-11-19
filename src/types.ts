export type AttachedFile = { name: string; url: string };

export type Todo = {
  id: string;
  title: string;
  description: string;
  done: boolean;
  completionDate: string;
  attachedFiles: AttachedFile[];
};

export type AddAction = { type: 'add' };

export type EditAction = { type: 'edit'; id: string };
