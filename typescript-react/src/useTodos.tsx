import React from 'react';
import { ActionType, Todo } from './App';
import { createGlobalState } from 'react-use';

/*

  const [state, dispatch] = useReducer(reducer, initialArg, init?)

  */

// react-use dependency: createGlobalState to create globally shared state
const useGlobalTodos = createGlobalState<Todo[]>([]);

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;
const TodoContext = React.createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

export function useTodosManager(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, todosSet] = useGlobalTodos();

  React.useEffect(() => {
    todosSet(initialTodos);
  }, [initialTodos, todosSet]);

  // const [todos, dispatch] = React.useReducer(
  //   (state: Todo[], action: ActionType) => {
  //     switch (action.type) {
  //       case 'ADD':
  //         return [
  //            ...state,
  //            { id: state.length, text: action.text, done: false },
  //         ];
  //       case 'REMOVE':
  //         return state.filter(({ id }) => id !== action.id);
  //       default:
  //         throw new Error();
  //     }
  //   },
  //   // initialArg
  //   initialTodos
  // );

  // We want to hide dispatch so we can create some callback functions - addTodo, removeTodo

  const addTodo = React.useCallback(
    (text: string) => {
      // dispatch({
      //   type: 'ADD',
      //   text,
      // });
      todosSet([...todos, { id: todos.length, text: text, done: false }]);
    },
    [todos, todosSet]
  );
  const removeTodo = React.useCallback(
    (removeId: number) => {
      // dispatch({
      //   type: 'REMOVE',
      //   id,
      // });
      todosSet(todos.filter(({ id }) => id !== removeId));
    },
    [todos, todosSet]
  );

  return { todos, addTodo, removeTodo };
}

export const TodosProvider: React.FC<{
  initialTodos: Todo[];
  children?: React.ReactNode;
}> = ({ initialTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initialTodos)}>
    {children}
  </TodoContext.Provider>
);

export const useTodos = (): Todo[] => {
  const { todos } = React.useContext(TodoContext);
  return todos;
};
export const useAddTodo = (): UseTodosManagerResult['addTodo'] => {
  const { addTodo } = React.useContext(TodoContext);
  return addTodo;
};
export const useRemoveTodo = (): UseTodosManagerResult['removeTodo'] => {
  const { removeTodo } = React.useContext(TodoContext);
  return removeTodo;
};
