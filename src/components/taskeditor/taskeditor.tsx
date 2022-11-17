import { FC } from 'react';
import Button from '../button';
import './taskeditor.less';

type TaskEditorProps = {
  title: string;
};

const TaskEditor: FC<TaskEditorProps> = ({ title }) => {
  return (
    <div className="task-editor">
      <form className="task-editor__form">
        <h3>{title}</h3>

        <div className="task-editor__item">
          <label htmlFor="title">Название</label>
          <input
            type="text"
            name="title"
            id="title"
            tabIndex={1}
            placeholder="Сделать тестовое задание"
            required
          />
        </div>

        <div className="task-editor__item">
          <label htmlFor="description">Описание</label>
          <textarea
            name="description"
            id="description"
            tabIndex={2}
            placeholder="Сверстать UI, написать логику и развернуть на хостинге"
          ></textarea>
        </div>

        <div className="task-editor__control">
          <Button buttonProps={{ type: 'submit' }}>Сохранить</Button>
          <Button buttonProps={{ type: 'button' }}>Отмена</Button>
        </div>
      </form>
    </div>
  );
};

export default TaskEditor;
