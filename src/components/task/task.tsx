import { FC } from 'react';
import { Todo } from '../../types';
import Button from '../button';
import './task.less';

type TaskProps = {
  todo: Todo;
};

const Task: FC<TaskProps> = ({ todo: { title, description } }) => (
  <article className="task">
    <h2>{title}</h2>

    <p>{description}</p>

    <div className="task__control">
      <Button buttonProps={{ type: 'button' }}>Выполнено</Button>
      <Button buttonProps={{ type: 'button' }}>Редактировать</Button>
      <Button buttonProps={{ type: 'button' }}>Удалить</Button>
    </div>
  </article>
);

export default Task;
