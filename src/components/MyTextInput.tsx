import { twMerge } from 'tailwind-merge';

interface MyTextInputProps {
  value?: string | undefined;
  valueSetter?: React.Dispatch<React.SetStateAction<string>> | undefined;
  multiLine?: boolean | undefined;
  readOnly?: boolean | undefined;
  inputClassName?: string | undefined;
  placeholder?: string | undefined;
}

const MyTextInput: React.FC<MyTextInputProps> = ({
  value,
  valueSetter,
  multiLine,
  readOnly,
  inputClassName,
  placeholder,
}) => {
  return (
    <div className="h-full w-full rounded-xl">
      {!multiLine && (
        <input
          type="text"
          className={twMerge(
            'h-full w-full bg-white text-xl tracking-widest font-semibold text-my-primary rounded-xl p-5',
            inputClassName,
          )}
          value={value}
          onChange={e => valueSetter && valueSetter(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
        />
      )}
      {multiLine && (
        <textarea
          className={twMerge(
            'h-full w-full bg-white text-xl tracking-widest font-semibold text-my-primary rounded-lg p-5',
            inputClassName,
          )}
          value={value}
          onChange={e => valueSetter && valueSetter(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default MyTextInput;
