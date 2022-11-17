import { FC, useState } from 'react';
import Button from '../button';
import TodoEditor from '../todoeditor';
import TodoList from '../todolist';
import './app.less';

const App: FC = () => {
  const [isAdding, setAdding] = useState(false);

  const openAdding = () => setAdding(true);

  const closeAdding = () => setAdding(false);

  return (
    <main>
      {isAdding && (
        <TodoEditor formTitle="Новая задача" closeAdding={closeAdding} />
      )}

      <div className="container">
        <h1>Список задач</h1>

        <section>
          <Button buttonProps={{ type: 'button', onClick: openAdding }}>
            Добавить задачу
          </Button>
        </section>

        <TodoList />
      </div>
    </main>
  );
};

export default App;
