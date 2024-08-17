import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import { FormEvent, useState } from "react";
 import { useAuth } from "../AuthProvider/AuthProvider";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Here you would typically validate the credentials with your backend
    console.log("Sign in:", { email, password });
    signIn();
    const origin = location.state?.from?.pathname || '/app';
    navigate(origin);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <div className="mb-4">
        
        <Input
          label="Email"
          onChange={(val) => setEmail(val)}
          placeholder="Enter email"
          required
          value={email}
          type="text"
        />
      </div>
      <div className="mb-6">
        <Input
          label="Password"
          onChange={(val) => setPassword(val)}
          placeholder="******************"
          required
          value={password}
          type="password"
        />
      </div>
      <div className="flex items-center justify-between">
        <Button title="Sign In" />
        <Link
          to="/signup"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Create an account
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
