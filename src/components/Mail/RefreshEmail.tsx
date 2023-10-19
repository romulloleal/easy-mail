import { Icon } from '@iconify/react';
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useSession } from '@/providers/Session/useSession';

import ProgressCircle from '../ProgressCircle';

export const RefreshEmail = () => {
  const { session } = useSession();
  const queryClient = useQueryClient();

  const [counter, setCounter] = useState<number>(15);
  const [resetCounter, setResetCounter] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (resetCounter) {
      refreshMail();
    }

    interval = setInterval(() => {
      counter > 0 && setCounter(counter - 1);
      counter === 0 && refreshMail();
    }, 1000);

    return () => {
      interval && clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, resetCounter]);

  const refreshMail = () => {
    queryClient.invalidateQueries('getEmails');
    queryClient.invalidateQueries('newEmails');
    setResetCounter(false);
    setCounter(15);
  };

  const copyAddress = () => {
    copy(session?.addresses[0].address || '');
  };
  return (
    <div className="flex w-2/6 min-w-[250px] max-w-max flex-col">
      <div className="text-xs">E-mail temporário</div>
      <div className="flex w-full flex-row justify-between truncate rounded-md border border-gray-300">
        <div className="truncate p-2">{session?.addresses[0].address}</div>
        <div
          className="flex cursor-pointer flex-row items-center justify-center border-l border-gray-300 px-2"
          onClick={copyAddress}
        >
          <Icon icon="ant-design:copy-outlined" fontSize={20} /> Copy
        </div>
      </div>
      <div className="mt-2 flex flex-row items-center justify-center gap-2">
        <div className="flex items-center space-x-1">
          <span>Atualiza em</span>
          <ProgressCircle
            progress={(15 - counter / 15) * 100}
            remain={counter}
          />
        </div>
        <div
          className="flex cursor-pointer items-center space-x-1"
          onClick={refreshMail}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-gray-300">
            <Icon
              icon="fluent-mdl2:refresh"
              fontSize={18}
              className="rotate-90 text-gray-700"
            />
          </div>
          <span>Atualizar</span>
        </div>
      </div>
    </div>
  );
};
