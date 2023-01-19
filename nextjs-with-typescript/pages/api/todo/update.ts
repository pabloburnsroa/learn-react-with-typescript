import { NextApiRequest, NextApiResponse } from 'next';
// import { Todo } from '../../interfaces';
import { todos } from '../../../data';
import { updateTodo } from './todos';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    let { id, completed } = JSON.parse(req.body);
    updateTodo({ id, completed: Boolean(completed) });
    res.status(200).json({ msg: 'Todo has been updated' });
  } else {
    res.status(400).json({ msg: 'Invalid Request Method' });
  }
}
