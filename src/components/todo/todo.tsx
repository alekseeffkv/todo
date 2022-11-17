import { FC } from 'react';
import { Todo as TodoType } from '../../types';
import Button from '../button';
import './todo.less';

type TodoProps = {
  todo: TodoType;
};

const Todo: FC<TodoProps> = ({ todo: { title, description } }) => (
  <article className="todo">
    <h2>{title}</h2>

    <p>{description}</p>

    <div className="todo__control">
      <Button buttonProps={{ type: 'button' }}>Выполнено</Button>
      <Button buttonProps={{ type: 'button' }}>Редактировать</Button>
      <Button buttonProps={{ type: 'button' }}>Удалить</Button>
    </div>
  </article>
);

export default Todo;
