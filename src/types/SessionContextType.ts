import { SessionType } from './SessionType';

export type SessionContextType = {
  session: SessionType | null;
  setSession: (value: SessionType) => void;
  removeSession: () => Promise<void>;
  appLoading: boolean;
  lastReceivedMailId: string;
  setLastReceivedMailId: (mailId: string) => void;
};
