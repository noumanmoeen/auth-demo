import { InputProps } from "./Input.Types";

const Input: React.FC<InputProps> = ({label ,onChange , placeholder , required ,type ,value ,id}) => {
  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="name"
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
};

export default Input