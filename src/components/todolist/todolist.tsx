import { FC, useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseApp from '../../firebase';
import { Todo as TodoType } from '../../types';
import Todo from '../todo';
import './todolist.less';

const TodoList: FC = () => {
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

  return (
    <section className="todolist">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

export default TodoList;
