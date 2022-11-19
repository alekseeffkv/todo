import { FC, useCallback, useState } from 'react';
import { Todo as TodoType } from '../../types';
import Button from '../button';
import TodoEditor from '../todoeditor';
import TodoList from '../todolist';
import './app.less';

const initialEditing = { id: '', isEditing: false };

const App: FC = () => {
  const [isAdding, setAdding] = useState(false);
  const [editing, setEditing] = useState(initialEditing);

  const { id, isEditing } = editing;

  const openAdding = () => setAdding(true);
  const closeAdding = () => setAdding(false);

  const openEditing = useCallback(({ id }: Pick<TodoType, 'id'>) => {
    setEditing({ id, isEditing: true });
  }, []);
  const closeEditing = () => setEditing(initialEditing);

  return (
    <main>
      {isAdding && (
        <TodoEditor mode={{ type: 'add' }} closeEditor={closeAdding} />
      )}

      {isEditing && (
        <TodoEditor mode={{ type: 'edit', id }} closeEditor={closeEditing} />
      )}

      <div className="container">
        <h1>Список задач</h1>

        <section>
          <Button buttonProps={{ type: 'button', onClick: openAdding }}>
            Добавить задачу
          </Button>
        </section>

        <TodoList openEditor={openEditing} />
      </div>
    </main>
  );
};

export default App;
