interface MyProgressProps {
  value: number;
}

const MyProgress: React.FC<MyProgressProps> = ({ value }) => {
  if (value < 0 || isNaN(value)) {
    value = 0;
  }

  if (value > 100) {
    value = 100;
  }

  return (
    <div className="flex h-2 w-full bg-gray-500 rounded-md">
      <div style={{ width: `${value}%` }} className="flex h-2 bg-my-tertiary rounded-md" />
    </div>
  );
};

export default MyProgress;
