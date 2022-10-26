interface IInputProps {
  placeholder: string;
  value: string;
  type: string;
  label: string;
  id: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({
  id,
  label,
  placeholder,
  value,
  type,
  setValue,
}: IInputProps) => {
  return (
    <div>
      <label htmlFor={id} className='block mb-2'>
        {label}
      </label>
      <input
        id={id}
        className='border border-slate-300 w-full p-2 rounded outline-none focus:border-slate-500'
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
