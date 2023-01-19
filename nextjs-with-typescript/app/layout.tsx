import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <h1>Lets Learn NEXT. JS by creating a Todo App</h1>
        {children}
      </body>
    </html>
  );
}
