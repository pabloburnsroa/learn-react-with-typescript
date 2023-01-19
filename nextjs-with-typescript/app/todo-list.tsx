// import useSWR from 'swr';
// import { useState } from 'react';
import type { TodoInterface } from '../interfaces';
import Todo from './todo';

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getTodos = async () => {
  const res = await fetch('http://localhost:3000/api/todo/todos');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export default async function TodoList() {
  // const [todos, setTodos] = useState([]);
  // const { data, error, isLoading } = useSWR<Todo[]>('/pages/api/todo', fetcher);
  // if (error) return <div>Failed to load</div>;
  // if (isLoading) return <div>Loading...</div>;
  // if (!data) return null;
  // console.log(data);
  const { todos } = await getTodos();
  // console.log(todos);

  return (
    <div>
      <ul style={{ listStyleType: 'none', padding: '0px' }}>
        {todos.map((t: TodoInterface) => {
          return <Todo key={t.id} to={t} />;
        })}
      </ul>
    </div>
  );
}
