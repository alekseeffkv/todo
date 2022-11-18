import { FC, useCallback, useEffect, useState } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import firebaseApp from '../../firebase';
import { Todo as TodoType } from '../../types';
import Todo from '../todo';
import './todolist.less';

type TodoListProps = { openEditor({ id }: Pick<TodoType, 'id'>): void };

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

  const changeTodoCompletion = useCallback(
    ({ id, done }: Pick<TodoType, 'id' | 'done'>) => {
      const todoRef = ref(db, `/todos/${id}`);
      update(todoRef, { done: !done });
    },
    [db]
  );

  return (
    <section className="todolist">
      {todoList.map(({ id, title, description, done }) => (
        <Todo
          key={id}
          id={id}
          title={title}
          description={description}
          done={done}
          changeTodoCompletion={changeTodoCompletion}
          openEditor={openEditor}
        />
      ))}
    </section>
  );
};

export default TodoList;
