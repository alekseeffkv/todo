import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import firebaseApp from '../../firebase';
import Button from '../button';
import './todoeditor.less';

type TodoEditorProps = {
  formTitle: 'Новая задача' | 'Редактирование задачи';
  closeAdding(): void;
};

const TodoEditor: FC<TodoEditorProps> = ({ formTitle, closeAdding }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const db = getDatabase(firebaseApp);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value.trim());
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value.trim());
  };

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todoRef = ref(db, '/todos');

    const todo = {
      title,
      done: false,
    };

    push(todoRef, todo);

    closeAdding();
  };

  return (
    <div className="todo-editor">
      <form onSubmit={addTodo} className="todo-editor__form">
        <h3>{formTitle}</h3>

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
          <Button buttonProps={{ type: 'submit' }}>Создать</Button>
          <Button buttonProps={{ type: 'button', onClick: closeAdding }}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TodoEditor;
