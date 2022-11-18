import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { getDatabase, ref, push, onValue, update } from 'firebase/database';
import firebaseApp from '../../firebase';
import Button from '../button';
import './todoeditor.less';
import { AddAction, EditAction, Todo } from '../../types';

type TodoEditorProps = {
  action: AddAction | EditAction;
  closeEditor(): void;
};

const TodoEditor: FC<TodoEditorProps> = ({ action, closeEditor }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { type } = action;

  const db = getDatabase(firebaseApp);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === 'add') {
      const todoRef = ref(db, '/todos');

      const todo = {
        title: title.trim(),
        description: description.trim(),
        done: false,
      };

      push(todoRef, todo);
    } else {
      const { id } = action;
      const todoRef = ref(db, `/todos/${id}`);

      update(todoRef, { title: title.trim(), description: description.trim() });
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
          const { title, description }: Omit<Todo, 'id'> = snapshot.val();

          setTitle(title);
          setDescription(description);
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
            onChange={handleTitle}
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
            onChange={handleDescription}
          ></textarea>
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
