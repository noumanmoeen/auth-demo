import SignInForm from "../../organisms/SignInForm/SignInForm";

const SignIn: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <SignInForm  />
      </div>
    </div>
    );
  };

export default SignIn;