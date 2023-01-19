import { NextApiRequest, NextApiResponse } from 'next';
// import { Todo } from '../../interfaces';
import { todos } from '../../../data';

export type updateTodoProps = {
  id: number;
  completed: boolean;
};

// Updating a todo item
export const updateTodo = ({ id, completed }: updateTodoProps) => {
  todos.map((t) => {
    if (t.id == id) {
      t.completed = completed;
    }
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ todos });
}
