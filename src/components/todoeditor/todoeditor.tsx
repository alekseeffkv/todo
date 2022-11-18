import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { getDatabase, ref, push, onValue, update } from 'firebase/database';
import firebaseApp from '../../firebase';
import Button from '../button';
import './todoeditor.less';
import { AddAction, EditAction, Todo } from '../../types';

const defaultValues = {
  title: '',
  description: '',
  completionDate: '',
};

type TodoEditorProps = {
  action: AddAction | EditAction;
  closeEditor(): void;
};

const TodoEditor: FC<TodoEditorProps> = ({ action, closeEditor }) => {
  const [values, setValues] = useState(defaultValues);

  const { title, description, completionDate } = values;

  const { type } = action;

  const db = getDatabase(firebaseApp);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === 'add') {
      const todoRef = ref(db, '/todos');

      const todo = {
        title: title.trim(),
        description: description.trim(),
        done: false,
        completionDate,
      };

      push(todoRef, todo);
    } else {
      const { id } = action;
      const todoRef = ref(db, `/todos/${id}`);

      update(todoRef, {
        title: title.trim(),
        description: description.trim(),
        completionDate,
      });
    }

    closeEditor();
  };

  useEffect(() => {
    if (type === 'edit') {
      const { id } = action;
      const todoRef = ref(db, `/todos/${id}`);

      onValue(
        todoRef,
        (snapshot) => {
          const { title, description, completionDate }: Omit<Todo, 'id'> =
            snapshot.val();

          setValues({ title, description, completionDate });
        },
        { onlyOnce: true }
      );
    }
  }, [action, db, type]);

  return (
    <div className="todo-editor">
      <form onSubmit={handleSubmit} className="todo-editor__form">
        <h3>{type === 'add' ? 'Новая задача' : 'Редактирование задачи'}</h3>

        <div className="todo-editor__item">
          <label htmlFor="title">Название</label>
          <input
            type="text"
            name="title"
            id="title"
            tabIndex={1}
            placeholder="Сделать тестовое задание"
            required
            value={title}
            onChange={handleChange}
          />
        </div>

        <div className="todo-editor__item">
          <label htmlFor="description">Описание</label>
          <textarea
            name="description"
            id="description"
            tabIndex={2}
            placeholder="Сверстать UI, написать логику и развернуть на хостинге"
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="todo-editor__item">
          <label htmlFor="completionDate">Дата завершения</label>
          <input
            type="date"
            name="completionDate"
            id="completionDate"
            tabIndex={3}
            value={completionDate}
            onChange={handleChange}
          />
        </div>

        <div className="todo-editor__control">
          <Button buttonProps={{ type: 'submit' }}>
            {type === 'add' ? 'Создать' : 'Сохранить'}
          </Button>
          <Button buttonProps={{ type: 'button', onClick: closeEditor }}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TodoEditor;
