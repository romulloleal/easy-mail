type DialogActionsProps = {
  children: React.ReactNode | string;
};

export const DialogActions = ({ children }: DialogActionsProps) => {
  return <div className="flex justify-end gap-2 pt-2">{children}</div>;
};
