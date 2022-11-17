import { FC } from 'react';
import Button from '../button';
import './app.less';

const App: FC = () => {
  return (
    <main>
      <div className="container">
        <h1>Список задач</h1>
        <div>
          <Button buttonProps={{ type: 'button' }}>Добавить задачу</Button>
        </div>
      </div>
    </main>
  );
};

export default App;
