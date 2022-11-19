export type AttachedFile = {
  /**Имя файла */
  name: string;
  /**URL файла */
  url: string;
};

export type Todo = {
  /**ID задачи */
  id: string;
  /**Заголовок задачи */
  title: string;
  /**Описание задачи */
  description: string;
  /**Завершена ли задача */
  done: boolean;
  /**Дата завершения задачи */
  completionDate: string;
  /**Прикрепленные файлы */
  attachedFiles?: AttachedFile[];
};

export type AddMode = {
  /**Тип режима редактора задачи */
  type: 'add';
};

export type EditMode = {
  /**Тип режима редактора задачи */
  type: 'edit';
  /**ID редактируемой задачи */
  id: string;
};
