type DialogTitleProps = {
  children: React.ReactNode | string;
};

export const DialogTitle = ({ children }: DialogTitleProps) => {
  return (
    <div className="flex items-center justify-between pb-3">
      <p className="text-2xl font-bold">{children}</p>
    </div>
  );
};
