import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import { FormEvent, useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { signInHandler } from "../../../APIs/authApis";
import { notify } from "../../../utils/notify";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await signInHandler({ email, password });
      console.log("Sign-in successful", response);
      notify("You've been succesfully logged in" ,"success")
      signIn(response.token);
      const origin = location.state?.from?.pathname || "/app";
      navigate(origin);
    } catch (err : any) {
      setError(err.message);
      notify(err?.message ?? 'There was some problem logging in' ,"error")
    }
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
          placeholder="Enter Email"
          required
          value={email}
          type="text"
        />
      </div>
      <div className="mb-6">
        <Input
          label="Password"
          onChange={(val) => setPassword(val)}
          placeholder="Enter Password"
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
