export type MailType = {
  id: string;
  toAddr: string;
  html: string;
  text: string;
  receivedAt: string;
  rawSize: number;
  headerFrom: string;
  headerSubject: string;
  fromAddr: string;
  downloadUrl: string;
  attachments: Attachment[];
};

interface Attachment {
  id: string;
  name: string;
  downloadUrl: string;
}
