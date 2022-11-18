import { FC } from 'react';
import { Todo as TodoType } from '../../types';
import Button from '../button';
import './todo.less';

type TodoProps = {
  changeTodoCompletion({ id, done }: Pick<TodoType, 'id' | 'done'>): void;
  openEditor({ id }: Pick<TodoType, 'id'>): void;
} & TodoType;

const Todo: FC<TodoProps> = ({
  id,
  title,
  description,
  done,
  changeTodoCompletion,
  openEditor,
}) => {
  return (
    <article
      className="todo"
      style={{ backgroundColor: done ? '#9ad9ab' : '' }}
    >
      <h2>{title}</h2>

      {!!description && <p>{description}</p>}

      <div className="todo__control">
        <Button
          buttonProps={{
            type: 'button',
            onClick: () => changeTodoCompletion({ id, done }),
          }}
        >
          {done ? 'Начать' : 'Завершить'}
        </Button>
        <Button
          buttonProps={{ type: 'button', onClick: () => openEditor({ id }) }}
        >
          Редактировать
        </Button>
        <Button buttonProps={{ type: 'button' }}>Удалить</Button>
      </div>
    </article>
  );
};

export default Todo;
