import { ReactElement, ReactNode } from 'react';

export interface HeadingProps {
  title: string;
}

export function Heading({ title }: HeadingProps) {
  return <h1>{title}</h1>;
}

export type ListComponent = <ListItem>({
  items,
  render,
}: {
  items: ListItem[];
  render: (item: ListItem) => ReactNode;
}) => ReactElement;

export const List: ListComponent = ({ items, render }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}> {render(item)}</li>
      ))}
    </ul>
  );
};

function TestComponent() {
  return (
    <div>
      <Heading title="Hello" />
      <List items={[1, 2, 3, 4, 5]} render={(str) => <strong>{str}</strong>} />
    </div>
  );
}

export default TestComponent;
