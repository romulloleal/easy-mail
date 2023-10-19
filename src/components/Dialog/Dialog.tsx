import { useEffect } from 'react';

type DialogProps = {
  show: boolean;
  closeDialog: () => void;
  children?: React.ReactNode;
};

export const Dialog = ({ show, closeDialog, children }: DialogProps) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDialog();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [closeDialog]);

  return (
    <div
      className={`fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center transition delay-200 ease-linear ${
        show ? 'visible opacity-100' : 'invisible opacity-0 '
      }`}
    >
      <div
        className="absolute h-full w-full bg-gray-900 opacity-50 "
        onClick={closeDialog}
      />

      <div className="z-20 mx-auto w-11/12 overflow-y-auto rounded bg-white shadow-lg md:max-w-md">
        <div className="px-6 py-4 text-left">{children}</div>
      </div>
    </div>
  );
};
