import { twMerge } from 'tailwind-merge';

interface MyButtonProps {
  label?: string | undefined;
  onClick?: () => void | undefined;
  className?: string | undefined;
}

const MyButton: React.FC<MyButtonProps> = ({ label, onClick, className }) => {
  return (
    <div
      className={twMerge(
        'flex w-full justify-center items-center bg-transparent border-2 border-transparent ' +
          'rounded-md p-1.5 cursor-pointer tracking-widest font-semibold',
        className,
      )}
      onClick={onClick ?? (() => {})}
    >
      {label}
    </div>
  );
};

export default MyButton;
