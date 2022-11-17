import { FC } from 'react';
import { Todo as TodoType } from '../../types';
import Button from '../button';
import './todo.less';

type TodoProps = {
  changeTodoCompletion({ id, done }: Pick<TodoType, 'id' | 'done'>): void;
} & TodoType;

const Todo: FC<TodoProps> = ({
  id,
  title,
  description,
  done,
  changeTodoCompletion,
}) => {
  return (
    <article
      className="todo"
      style={{ backgroundColor: done ? '#9ad9ab' : '' }}
    >
      <h2>{title}</h2>

      <p>{description}</p>

      <div className="todo__control">
        <Button
          buttonProps={{
            type: 'button',
            onClick: () => changeTodoCompletion({ id, done }),
          }}
        >
          {done ? 'Начать' : 'Завершить'}
        </Button>
        <Button buttonProps={{ type: 'button' }}>Редактировать</Button>
        <Button buttonProps={{ type: 'button' }}>Удалить</Button>
      </div>
    </article>
  );
};

export default Todo;
