import React, {
  PropsWithChildren,
  useCallback,
  // useReducer,
  useState,
} from 'react';
// import logo from './logo.svg';
import './App.css';

import { useTodos, useRemoveTodo, useAddTodo, TodosProvider } from './useTodos';

import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, selectTodos } from './store';
import { ZustandStateManager } from './zustand';

import { useTodosXState } from './xstate';

const Heading = ({ title }: { title: string }) => {
  return <h2>{title}</h2>;
};

// Box component can accept component props
const Box = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const Box2: React.FC<PropsWithChildren> = ({ children }) => (
  <div>{children}</div>
);

const List1: React.FC<{
  items: string[];
  onClick?: (item: string) => void;
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>
        {item}
      </li>
    ))}
  </ul>
);

interface Payload {
  text: string;
}

export interface Todo {
  id: number;
  done: boolean;
  text: string;
}

// DETAILED HTML PROPS - e.g. standard button
const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    title?: string;
  }
> = ({ title, children, style, ...rest }) => (
  <button
    {...rest}
    style={{ backgroundColor: 'red', color: 'white', fontSize: 'xx-large' }}
  >
    {title ?? children}
  </button>
);

export type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number };

// CUSTOM HOOK: useNumber
const useNumber = (initialValue: number) => useState<number>(initialValue);

type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];

const Incrementer: React.FC<{
  value: UseNumberValue;
  valueSet: UseNumberSetValue;
}> = ({ value, valueSet }) => (
  <Button onClick={() => valueSet(value + 1)} title={`Add - ${value}`} />
);

// CREATING A GENERIC COMPONENT
function UL<T>({
  items,
  render,
  children,
  // Generic event handler: ItemCLick
  itemClick,
}: React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > & {
    items: T[];
    render: (item: T) => React.ReactNode;
    itemClick: (item: T) => void;
  }
>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  // const todos = useTodos();
  // const addTodo = useAddTodo();
  // const removeTodo = useRemoveTodo();
  // const { todos, removeTodo, addTodo } = useTodos([
  //   {
  //     id: 0,
  //     text: 'Hello, World!',
  //     done: false,
  //   },
  // ]);

  const onListClick = useCallback((item: string) => {
    alert(item);
  }, []);

  const [checkedState, checkedStateSet] = React.useState<Payload | null>(null);

  React.useEffect(() => {
    fetch('/data.json')
      .then((resp) => resp.json())
      .then((data) => {
        checkedStateSet(data);
      });
  }, []);

  const newTodoRef = React.useRef<HTMLInputElement | null>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      // addTodo(newTodoRef.current.value);
      dispatch(addTodo(newTodoRef.current.value));
      newTodoRef.current.value = '';
    }
  }, [addTodo]);

  const [value, valueSet] = useState(0);

  return (
    <div className="App">
      <Heading title="I am a heading..." />
      <Box>Hello There, I am box1</Box>
      <Box2>I am Box2</Box2>
      <List1 items={['a', 'b', 'c']} onClick={onListClick} />
      <Box2>{JSON.stringify(checkedState)}</Box2>

      <Heading title="Todos" />
      {/* {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <Button onClick={() => removeTodo(todo.id)}>REMOVE</Button>
        </div>
      ))} */}
      <UL
        items={todos}
        itemClick={() => {}}
        render={(todo) => (
          <>
            {todo.text}
            <Button onClick={() => dispatch(removeTodo(todo.id))}>
              REMOVE
            </Button>
          </>
        )}
      />

      <div>
        <input type="text" ref={newTodoRef} />
        <Button onClick={onAddTodo}>ADD</Button>
      </div>
      <br />
      <Incrementer value={value} valueSet={valueSet} />
    </div>
  );
}

const JustShowTodos = () => {
  // const todos = useTodos();
  const todos = useSelector(selectTodos);
  return (
    <div>
      <p>Hello, World! I am just showing you todos</p>
      <UL
        items={todos}
        itemClick={() => {}}
        render={(todo) => <>{todo.text}</>}
      />
    </div>
  );
};

const XStateTodos = () => {
  const initialTodos = React.useMemo(
    () => [{ id: 0, text: 'Hey there', done: false }],
    []
  );
  const {
    todos,
    addTodo,
    removeTodo,
    isEditing,
    onStartWorking,
    onEndWorking,
  } = useTodosXState(initialTodos);

  const newTodoRef = React.useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = '';
    }
  }, [addTodo]);

  return (
    <div>
      <p>Hello, World! I am just showing you todos, using Xstate</p>
      {isEditing && (
        <>
          <UL
            items={todos}
            itemClick={() => {}}
            render={(todo) => (
              <>
                ({todo.done ? 'DONE' : 'NOT DONE'}){todo.text}
                <Button onClick={() => removeTodo(todo.id)}>REMOVE</Button>
              </>
            )}
          />

          <div>
            <input type="text" ref={newTodoRef} />
            <Button onClick={onAddTodo}>ADD</Button>
          </div>
          <Button onClick={onStartWorking}>Start Working</Button>
        </>
      )}
      {!isEditing && <Button onClick={onEndWorking}>Stop Working</Button>}
    </div>
  );
};

const AppWrapper = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    }}
  >
    <TodosProvider
      initialTodos={[
        {
          id: 0,
          text: 'Hello, World! & useContext...',
          done: false,
        },
      ]}
    >
      <div>
        <App />
      </div>
    </TodosProvider>
    <JustShowTodos />
    <XStateTodos />
  </div>
);

export default AppWrapper;
