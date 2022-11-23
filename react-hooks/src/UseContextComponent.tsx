import UserContext, { UserState } from './store';
import React from 'react';

function ConsumerComponent() {
  const user = React.useContext<UserState>(UserContext);

  return (
    <div>
      <div>First: {user.first}</div>
      <div>Last: {user.last}</div>
    </div>
  );
}

function UseContextComponent() {
  const [user, userSet] = React.useState<UserState>({
    first: 'John',
    last: 'Smith',
  });

  return (
    <UserContext.Provider value={user}>
      <ConsumerComponent />
      <button
        onClick={() =>
          userSet({
            first: 'Mary',
            last: 'Taylor',
          })
        }
      >
        Change Context
      </button>
    </UserContext.Provider>
  );
}

export default UseContextComponent;
