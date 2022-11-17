import { FC } from 'react';
import Button from '../button';
import Task from '../task';
import Taskeditor from '../taskeditor';
import './app.less';

const App: FC = () => {
  return (
    <main>
      {/* <Taskeditor title="Добавление задачи" /> */}

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
