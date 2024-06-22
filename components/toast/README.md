
# Toast System Documentation

This document provides an overview and usage guide for the Toast notification system implemented in React for Next.js. Toast notifications are brief messages that appear at the edge of the screen to provide feedback to the user.

## Overview

The Toast Notification system consists of several React components and hooks designed to facilitate the creation and management of toast notifications within a React application.

## Components and Hooks

### `ToastProvider`

A context provider for toast notifications. It should wrap the root of your application to ensure that toast functionality is accessible throughout the component tree.

#### Usage

```jsx
import { ToastProvider } from '@components/toast';

const App = () => (
  <ToastProvider>
    <YourOtherComponents />
  </ToastProvider>
);
```

### `useToasts`

A custom hook that provides access to toast functionality, including adding and removing toasts.

#### Usage

The `useToasts` hook can be used in any functional component to access the `addToast` and `removeToast` functions. It should be used in conjunction with the `Toast` component, which renders the toast notifications.

```jsx
'use client';
import React from 'react';
import { useToasts, Toast } from '@/components/toast';

const MyComponent = () => {
  const { addToast } = useToasts();
  
  return (
    <>
      <button onClick={() => addToast("Success!", {style: "success", duration: 3000})}>
        Click to add a toast
      </button>
      <Toast />
    </>
  );
};

export default MyComponent;
```

### `Toast`

A component that renders the toast notifications. It uses `CSSTransition` for animations.

#### Props

- **content**: The message or JSX to be displayed in the toast.
- **options**: An object containing options for the toast, such as duration and transitionDuration.
  - **options.duration**: The duration in milliseconds that the toast should be displayed. Defaults to 4000.
  - **options.style**: The style of the toast, which determines the color and icon. Defaults to `info`.
  - **options.transitionDuration**: The duration in milliseconds of the enter and exit animations. Defaults to 1000.

#### Usage

Place the `Toast` component in your application where you want the toast notifications to appear, and optionally pass style or other props.

```jsx
import React from 'react';
import { Toast } from '@/components/toast';

const ToastContainer = () => {
  return <Toast />;
};

export default ToastContainer;
```

### `addToast`

Adds a new toast notification.

#### Parameters

- **content**: The message or JSX to be displayed in the toast.
- **options**: An object containing options for the toast, such as duration and transitionDuration.
  - **options.duration**: The duration in milliseconds that the toast should be displayed. Defaults to 4000.
  - **options.style**: The style of the toast, which determines the color and icon. Defaults to `info`.
  - **options.transitionDuration**: The duration in milliseconds of the enter and exit animations. Defaults to 1000.

#### Example

```jsx
addToast('Something good happened!', { duration: 6000, style: 'success', transitionDuration: 300 });
```

## Styles

The style of the toast notifications can be customized via CSS modules. The styles are defined in `toast.module.css`.

## Dependency

This system depends on `react-transition-group` for animation.

## Error Handling and Common Issues

- Ensure that `ToastProvider` is wrapping your application correctly.
- Verify that the `useToasts` hook is being used within a component wrapped by `ToastProvider`.
- Check the console for any specific error messages and address them accordingly.

## Conclusion

This Toast Notification system provides a robust and flexible way to add notifications to your React applications with support for customizable durations, styles, and animations.