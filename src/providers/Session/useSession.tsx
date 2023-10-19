import { useContext } from 'react';

import { SessionContext } from '.';

export function useSession() {
  const context = useContext(SessionContext);

  return context;
}
