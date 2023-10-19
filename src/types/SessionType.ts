export type SessionType = {
  id: string;
  expiresAt: string;
  addresses: { address: string }[];
  lastReceivedMailId: string;
};
