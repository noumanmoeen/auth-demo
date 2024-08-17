import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import { PasswordStrength } from "./SignUpForm.type";
import { validateEmail } from "../../../utils/helpers";

const SignUpForm: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
        minLength: false,
        hasLetter: false,
        hasNumber: false,
        hasSpecial: false,
      });
    const navigate = useNavigate();
    const { signIn } = useAuth();
  
    const validatePassword = (password: string): boolean => {
        return Object.values(passwordStrength).every(Boolean);
      };
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }
      if (!validatePassword(password)) {
        setError("Password does not meet requirements");
        return;
      }
      console.log("Sign up:", { email, name, password });
      signIn();
      navigate("/app");
    };
  

    useEffect(() => {
        setPasswordStrength({
          minLength: password.length >= 8,
          hasLetter: /[a-zA-Z]/.test(password),
          hasNumber: /\d/.test(password),
          hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        });
      }, [password]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
        <div className="mb-4">
          <Input
            label="Name"
            onChange={(val) => setName(val)}
            placeholder="Enter name"
            required
            value={name}
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
           <div className="text-sm mb-3 mt-3">
              <p className={passwordStrength.minLength ? "text-green-500" : "text-red-400"}>
                { passwordStrength.minLength && '✓'} At least 8 characters long
              </p>
              <p className={passwordStrength.hasLetter ? "text-green-500" : "text-red-400"}>
                {passwordStrength.hasLetter && '✓'} Contains at least 1 letter
              </p>
              <p className={passwordStrength.hasNumber ? "text-green-500" : "text-red-400"}>
                {passwordStrength.hasNumber && '✓'} Contains at least 1 number
              </p>
              <p className={passwordStrength.hasSpecial ? "text-green-500" : "text-red-400"}>
                { passwordStrength.hasSpecial && '✓'} Contains at least 1 special character
              </p>
            </div>
        
        </div>
        {error && <p className="text-red-400 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <Button title="Sign Up" />
          <Link
            to="/signin"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </>
  );
};


export default SignUpForm