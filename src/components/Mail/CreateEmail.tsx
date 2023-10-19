import { Icon } from '@iconify/react';
import { useMutation } from 'react-query';

import { useSession } from '@/providers/Session/useSession';
import { api } from '@/services/api';
import { SessionType } from '@/types/SessionType';

import { Button } from '../Button';

export const CreateEmail = () => {
  const { setSession } = useSession();

  const { mutate: createSession, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await api.post<{
        data: { introduceSession: SessionType };
      }>(``, {
        query: `mutation {
          introduceSession {
            id
            expiresAt
            addresses {
              address
            }
          }
        }`,
      });

      const newSession = data.data.introduceSession;

      localStorage.setItem('@EasyMail:session', JSON.stringify(newSession));
      setSession(newSession);
    },
  });

  return isLoading ? (
    <div className="flex flex-col items-center">
      <Icon
        icon="gg:spinner"
        fontSize={30}
        className="animate-spin text-info"
      />
      Criando e-mail temporário
    </div>
  ) : (
    <Button onClick={() => createSession()} variant="contained">
      Criar e-mail temporário
    </Button>
  );
};
