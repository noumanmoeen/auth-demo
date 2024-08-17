import { ButtonProps } from "./Button.type";

const Button: React.FC<ButtonProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type={'submit'}
      >
        {title}
      </button>
    </div>
  );
};


export default Button