import { FC } from 'react';
import dayjs from 'dayjs';
import { Todo as TodoType } from '../../types';
import Button from '../button';
import './todo.less';

type TodoProps = {
  changeCompletion({ id, done }: Pick<TodoType, 'id' | 'done'>): void;
  openEditor({ id }: Pick<TodoType, 'id'>): void;
  deleteTodo({ id }: Pick<TodoType, 'id'>): void;
} & TodoType;

const Todo: FC<TodoProps> = ({
  id,
  title,
  description,
  done,
  completionDate,
  attachedFiles,
  changeCompletion,
  openEditor,
  deleteTodo,
}) => {
  const hasExpiredDate = dayjs()
    .subtract(1, 'day')
    .isAfter(dayjs(completionDate, 'day'));

  const backgroundColor = done ? '#9ad9ab' : hasExpiredDate ? '#e65247' : '';

  return (
    <article className="todo" style={{ backgroundColor }}>
      <h2>{title}</h2>

      {!!description && (
        <div className="todo__field">
          <h4>Описание</h4>
          <p>{description}</p>
        </div>
      )}

      {!!completionDate && (
        <div className="todo__field">
          <h4>Дата завершения</h4>
          <p>{dayjs(completionDate).format('DD.MM.YYYY')}</p>
        </div>
      )}

      <div className="todo__field">
        <h4>Прикрепленные файлы</h4>
        {attachedFiles && attachedFiles.length > 0 && (
          <ul>
            {attachedFiles.map(({ name, url }) => (
              <li key={url}>{name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="todo__control">
        <Button
          buttonProps={{
            type: 'button',
            onClick: () => changeCompletion({ id, done }),
          }}
        >
          {done ? 'Начать' : 'Завершить'}
        </Button>
        <Button
          buttonProps={{ type: 'button', onClick: () => openEditor({ id }) }}
        >
          Редактировать
        </Button>
        <Button
          buttonProps={{ type: 'button', onClick: () => deleteTodo({ id }) }}
        >
          Удалить
        </Button>
      </div>
    </article>
  );
};

export default Todo;
