import { Logo } from '../Logo';

export const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-screen animate-pulse items-center justify-center text-4xl">
      <Logo size={100} />
    </div>
  );
};
