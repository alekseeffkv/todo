import { FC } from 'react';
import Button from '../button';
import Task from '../task';
import './app.less';

const App: FC = () => {
  return (
    <main>
      <div className="container">
        <h1>Список задач</h1>
        <section>
          <Button buttonProps={{ type: 'button' }}>Добавить задачу</Button>
        </section>
        <section>
          <Task
            todo={{
              title: 'Первая задача',
              description: 'Описание первой задачи',
            }}
          />
        </section>
      </div>
    </main>
  );
};

export default App;
