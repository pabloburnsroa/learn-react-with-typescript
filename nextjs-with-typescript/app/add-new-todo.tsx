'use client';

// This is a Client Component. It receives data as props and
// has access to state and effects just like Page components
// in the `pages` directory.
export default function AddNewTodo() {
  return (
    <div>
      <h3>Add New Todo</h3>
      <input type="text" />
      <button>Add</button>
    </div>
  );
}
