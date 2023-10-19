import React, { createContext, useEffect, useMemo, useState } from 'react';

import { api } from '@/services/api';
import { SessionContextType } from '@/types/SessionContextType';
import { SessionType } from '@/types/SessionType';

export const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType,
);

const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appLoading, setAppLoading] = useState(true);
  const [session, setSession] = useState<SessionType | null>(null);
  const [lastReceivedMailId, setLastReceivedMailId] = useState<string>(() => {
    const lastReceived = localStorage.getItem('@EasyMail:lastReceivedMailId');

    if (lastReceived) {
      return lastReceived;
    }
    return '';
  });

  useEffect(() => {
    const sessionExists = localStorage.getItem('@EasyMail:session');
    if (sessionExists) {
      const parsedSession = JSON.parse(sessionExists);

      checkSessionExpired(parsedSession.id).then((response) => {
        if (response) {
          removeSession();
        }
        setAppLoading(false);
      });
    } else {
      setAppLoading(false);
      removeSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkSessionExpired = async (sessionId: string) => {
    const { data } = await api.post<{
      data: { session: SessionType | null };
    }>(``, {
      query: `query {
        session(id: "${sessionId}") {
          id
          expiresAt
          addresses {
            address
          }
        }
      }`,
    });

    if (!data.data.session) {
      await removeSession();
      return true;
    }
    setSession(data.data.session);
    localStorage.setItem(
      '@EasyMail:session',
      JSON.stringify(data.data.session),
    );
    return false;
  };

  const removeSession = async () => {
    localStorage.removeItem('@EasyMail:session');
    localStorage.removeItem('@EasyMail:lastReceivedMailId');

    setSession(null);
  };

  const sessionProvider = useMemo<SessionContextType>(
    () => ({
      session,
      setSession,
      removeSession,
      appLoading,
      lastReceivedMailId,
      setLastReceivedMailId,
    }),
    [session, appLoading, lastReceivedMailId],
  );

  return (
    <SessionContext.Provider value={sessionProvider}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
