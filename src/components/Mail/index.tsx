import { useSession } from '@/providers/Session/useSession';

import { CreateEmail } from './CreateEmail';
import { RefreshEmail } from './RefreshEmail';
import { EnableNotifications } from '../EnableNotifications';

export const Mail = () => {
  const { session } = useSession();

  return !session ? (
    <CreateEmail />
  ) : (
    <>
      <RefreshEmail />
      <EnableNotifications />
    </>
  );
};
