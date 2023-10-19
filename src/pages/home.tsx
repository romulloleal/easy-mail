import { useState } from 'react';
import { useQuery } from 'react-query';

import { Logo } from '@/components/Logo';
import { Mail } from '@/components/Mail';
import { EmailContent } from '@/components/Mail/EmailContent';
import { EmailSidebar } from '@/components/Mail/EmailSidebar';
import { useSession } from '@/providers/Session/useSession';
import { api } from '@/services/api';
import { MailType } from '@/types/MailType';

export const Home = () => {
  const { session, removeSession, lastReceivedMailId, setLastReceivedMailId } =
    useSession();
  const [selectedEmail, setSelectedEmail] = useState<MailType | undefined>(
    undefined,
  );

  // para resetar a animação quando clica em algum email caso não seja ele o aberto no momento
  const handleEmail = (mail: MailType | undefined) => {
    if (!mail) {
      setSelectedEmail(undefined);
    }
    if (mail?.id !== selectedEmail?.id) {
      setSelectedEmail(undefined);
      setTimeout(() => {
        setSelectedEmail(mail);
      }, 200);
    }
  };

  useQuery({
    enabled: !!session?.id,
    queryKey: ['newEmails', { lastReceivedMailId }],
    queryFn: async () => {
      const { data } = await api.post<{
        data: {
          session: { mailsAfterId?: MailType[]; mails: MailType[] } | null;
        };
      }>(``, {
        query: `query {
          session(id: "${session?.id}") {
            mailsAfterId${
              lastReceivedMailId.length
                ? `(mailId: "${lastReceivedMailId}")`
                : ''
            }
            {
              headerFrom
              headerSubject
            }
          }
        }`,
      });

      if (
        data.data.session?.mailsAfterId?.length &&
        window.Notification &&
        window.Notification.permission === 'granted'
      ) {
        data.data.session.mailsAfterId.map((mail) => {
          new Notification(mail.headerFrom, {
            body: mail.headerSubject,
            icon: '/logo.svg',
            dir: 'ltr',
          });
        });
      }
    },
  });

  const { data: mails, isLoading } = useQuery({
    enabled: !!session?.id,
    queryKey: ['getEmails'],
    queryFn: async () => {
      const { data } = await api.post<{
        data: {
          session: { mailsAfterId?: MailType[]; mails: MailType[] } | null;
        };
      }>(``, {
        query: `query {
          session(id: "${session?.id}") {
            mails{
              id
              receivedAt
              rawSize
              fromAddr
              toAddr
              downloadUrl
              html
              text
              headerFrom
              headerSubject
              attachments{
                id
                name
                downloadUrl
              }
            }
          }
        }`,
      });

      if (!data.data.session || !session) {
        await removeSession();
      }

      if (data.data.session?.mails.length) {
        setLastReceivedMailId(data.data.session?.mails[0].id);
        localStorage.setItem(
          '@EasyMail:lastReceivedMailId',
          data.data.session?.mails[0].id,
        );
      }

      return data.data.session?.mails;
    },
  });

  return (
    <div className="flex h-screen bg-neutral-50 sm:justify-center sm:pb-12">
      <div className="flex w-full flex-col sm:w-10/12">
        <div className="flex items-center justify-center pb-4 pt-4">
          <Logo />
        </div>
        <div className="flex h-full w-full flex-col border">
          <div className="flex flex-col items-center justify-center gap-2 pb-2 pt-2">
            <Mail />
          </div>
          <div className="relative flex h-[calc(100vh_-_20rem)] flex-grow flex-row border-t">
            {session && (
              <>
                <div
                  className={`${
                    !selectedEmail ? 'flex' : 'hidden'
                  } w-full flex-col sm:flex sm:w-5/12 sm:border-r md:w-4/12 lg:w-3/12`}
                >
                  <EmailSidebar
                    mails={mails}
                    handleEmail={handleEmail}
                    selectedEmail={selectedEmail}
                    isLoading={isLoading}
                  />
                </div>
                <div
                  className={`sm:relative ${
                    selectedEmail ? 'flex' : 'hidden'
                  } overflow-y-auto overflow-x-hidden sm:flex sm:w-7/12 sm:flex-grow md:w-8/12 lg:w-9/12`}
                >
                  <div
                    className={`absolute ${
                      selectedEmail ? 'right-0' : '-right-full'
                    } h-full w-full transition-all duration-200`}
                  >
                    {selectedEmail && (
                      <EmailContent
                        mail={selectedEmail!}
                        handleEmail={handleEmail}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
