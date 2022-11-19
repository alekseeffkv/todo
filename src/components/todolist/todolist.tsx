import { FC, useCallback, useEffect, useState } from 'react';
import {
  getDatabase,
  ref,
  onValue,
  update,
  remove,
  off,
} from 'firebase/database';
import { firebaseApp } from '../../firebase';
import { Todo as TodoType } from '../../types';
import Todo from '../todo';
import './todolist.less';

type TodoListProps = {
  /**Колбэк открытия редактора */
  openEditor({ id }: Pick<TodoType, 'id'>): void;
};

/**Компонет списка задач */
const TodoList: FC<TodoListProps> = ({ openEditor }) => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const db = getDatabase(firebaseApp);

  useEffect(() => {
    const todoRef = ref(db, '/todos');

    onValue(todoRef, (snapshot) => {
      const todos = snapshot.val();
      const newTodoList: TodoType[] = [];

      for (let id in todos) {
        newTodoList.push({ id, ...todos[id] });
      }

      setTodoList(newTodoList);
    });
  }, [db]);

  const changeCompletion = useCallback(
    ({ id, done }: Pick<TodoType, 'id' | 'done'>) => {
      const todoRef = ref(db, `/todos/${id}`);
      update(todoRef, { done: !done });
    },
    [db]
  );

  const deleteTodo = useCallback(
    ({ id }: Pick<TodoType, 'id'>) => {
      const todoRef = ref(db, `/todos/${id}`);
      remove(todoRef);
      off(todoRef);
    },
    [db]
  );

  return (
    <section className="todolist">
      {todoList.map(
        ({ id, title, description, done, completionDate, attachedFiles }) => (
          <Todo
            key={id}
            id={id}
            title={title}
            description={description}
            done={done}
            completionDate={completionDate}
            attachedFiles={attachedFiles}
            changeCompletion={changeCompletion}
            openEditor={openEditor}
            deleteTodo={deleteTodo}
          />
        )
      )}
    </section>
  );
};

export default TodoList;
