import { assign, createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import React from 'react';

interface ITodo {
  id: number;
  done: boolean;
  text: string;
}

const todoMachine = createMachine<
  { todos: ITodo[] },
  | { type: 'START_WORKING' }
  | { type: 'END_WORKING' }
  | {
      type: 'SET_TODOS';
      todos: ITodo[];
    }
  | {
      type: 'ADD_TODO';
      text: string;
    }
  | {
      type: 'REMOVE_TODO';
      id: number;
    }
>(
  {
    id: 'todoMachine',
    initial: 'editing',
    context: {
      todos: [],
    },
    states: {
      editing: {
        on: {
          START_WORKING: {
            target: 'working',
            cond: 'haveUndoneTodos',
          },
          SET_TODOS: {
            actions: assign({
              todos: (_, { todos }) => todos,
            }),
          },
          REMOVE_TODO: {
            actions: assign({
              todos: ({ todos }, { id: removeId }) =>
                todos.filter(({ id }) => id !== removeId),
            }),
          },
          ADD_TODO: {
            actions: assign({
              todos: ({ todos }, { text }) => [
                ...todos,
                {
                  id: todos.length,
                  text,
                  done: false,
                },
              ],
            }),
          },
        },
      },
      working: {
        exit: assign({
          todos: ({ todos }) => {
            const newTodos = [...todos];
            const undoneTodo = newTodos.find(({ done }) => !done);
            if (undoneTodo) {
              undoneTodo.done = true;
            }
            return newTodos;
          },
        }),
        on: {
          END_WORKING: {
            target: 'editing',
          },
        },
      },
    },
  },
  {
    guards: {
      haveUndoneTodos: ({ todos }) => todos.some(({ done }) => !done),
    },
  }
);

export function useTodosXState(initialTodos: ITodo[]): {
  onStartWorking: () => void;
  onEndWorking: () => void;
  isEditing: boolean;
  todos: ITodo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [state, send] = useMachine(todoMachine);

  React.useEffect(() => {
    send({ type: 'SET_TODOS', todos: initialTodos });
  }, [initialTodos, send]);

  const addTodo = React.useCallback(
    (text: string) => {
      send({ type: 'ADD_TODO', text });
    },
    [send]
  );
  const removeTodo = React.useCallback(
    (id: number) => {
      send({ type: 'REMOVE_TODO', id });
    },
    [send]
  );

  const onStartWorking = React.useCallback(() => {
    send('START_WORKING');
  }, [send]);
  const onEndWorking = React.useCallback(() => {
    send('END_WORKING');
  }, [send]);

  return {
    isEditing: state.matches('editing'),
    todos: state.context.todos,
    addTodo,
    removeTodo,
    onStartWorking,
    onEndWorking,
  };
}
