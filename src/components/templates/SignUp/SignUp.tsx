import SignUpForm from "../../organisms/SignUpForm/SignUpForm";

const SignUp: React.FC = () => {

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
       <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
