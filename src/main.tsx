import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App.tsx';
import SessionProvider from './providers/Session';

import './global.css';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <App />
      </SessionProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
