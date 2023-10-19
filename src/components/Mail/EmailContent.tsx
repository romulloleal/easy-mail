import { Icon } from '@iconify/react';

import { MailType } from '@/types/MailType';

type EmailContentProps = {
  mail: MailType;
  handleEmail: (value: undefined) => void;
};

export const EmailContent = ({ mail, handleEmail }: EmailContentProps) => {
  return (
    <div className=" min-h-full w-full bg-gray-100 pb-2">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex h-9 items-center">
          <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full hover:bg-gray-200 sm:hidden">
            <Icon
              icon="mingcute:left-line"
              fontSize={25}
              onClick={() => handleEmail(undefined)}
            />
          </div>
          <div className=" text-lg font-semibold">{mail.headerSubject}</div>
        </div>
        <span className="text-sm">
          {new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short',
          }).format(new Date(mail.receivedAt))}
        </span>
      </div>
      <div className="border-b px-4 py-2 text-sm">De: {mail.headerFrom}</div>
      <div className="mx-2 my-2 bg-white px-2 py-2">
        <div dangerouslySetInnerHTML={{ __html: mail.html }} />
        {!!mail.attachments.length && (
          <div className="mb-3 mt-3 flex flex-col border-t pt-2">
            <span className="text-sm font-bold">
              {mail.attachments.length} anexo
              {mail.attachments.length > 1 && 's'}
            </span>
            <div className="flex gap-2">
              {mail.attachments.map((attachment) => (
                <a
                  key={attachment.id}
                  className="text-primary hover:text-blue-700"
                  href={attachment.downloadUrl}
                >
                  {attachment.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
