import { useNavigate } from "react-router-dom";
import { useAuth } from "../../organisms/AuthProvider/AuthProvider";
import { notify } from "../../../utils/notify";

const Home: React.FC = () => {

    const { signOut } = useAuth();
    const navigate = useNavigate();
  
    const handleSignOut = () => { 
      notify("You've been logged out", 'info')
      signOut();
      navigate('/signin');
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the application</h1>
        <p className="text-gray-600 mb-4">You have successfully authenticated and accessed the main application page.</p>
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign Out
        </button>
      </div>
    </div>
    );
  };

export default Home;