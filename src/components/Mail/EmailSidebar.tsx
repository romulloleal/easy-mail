import { Icon } from '@iconify/react';

import { MailType } from '@/types/MailType';

type EmailSidebarProps = {
  mails?: MailType[];
  selectedEmail?: MailType;
  handleEmail: (mail: MailType) => void;
  isLoading: boolean;
};

export const EmailSidebar = ({
  mails,
  selectedEmail,
  handleEmail,
  isLoading,
}: EmailSidebarProps) => {
  return (
    <>
      <div className="border-b pb-2 pt-2 text-center font-bold">
        Caixa de entrada
      </div>
      {!mails?.length ? (
        <div className="flex h-full items-center justify-center">
          {isLoading ? (
            <Icon
              icon="gg:spinner"
              fontSize={30}
              className="animate-spin text-info"
            />
          ) : (
            <span>Sua caixa está vázia</span>
          )}
        </div>
      ) : (
        <div className="flex flex-grow flex-col overflow-y-auto text-sm [&>*:not(:last-child)]:border-b">
          {mails?.map((mail, i) => (
            <div
              key={i}
              onClick={() => handleEmail(mail)}
              className={`flex h-24 cursor-pointer flex-col px-4 py-2 hover:bg-gray-100 ${
                selectedEmail?.id === mail.id && 'bg-gray-100'
              }`}
            >
              <span className="truncate font-bold text-primary">
                {mail.headerFrom}
              </span>
              <span className="truncate font-bold">{mail.headerSubject}</span>
              <span className="truncate">{mail.text}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
