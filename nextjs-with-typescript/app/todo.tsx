'use client';
import { useRouter } from 'next/navigation';
import { TodoInterface } from '../interfaces/index';

type TodoProps = {
  to: TodoInterface;
};
type updateProps = {
  id: number;
  completed: boolean;
};

export default function Todo({ to }: TodoProps) {
  const router = useRouter();
  const update = async (id: number, completed: boolean) => {
    await fetch('http://localhost:3000/api/todo/update', {
      method: 'PUT',
      body: JSON.stringify({ id, completed }),
    });
    router.refresh();
  };
  return (
    <li style={{ padding: '5px 0' }}>
      <input
        type="checkbox"
        onChange={(e) => update(to.id, e.target.checked)}
        checked={to.completed}
      />
      {to.todo}
      <button>x</button>
    </li>
  );
}
