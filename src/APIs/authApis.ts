const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Adjust this to match your backend URL

interface SignUpData {
  email: string;
  name: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

export const signUpHandler = async (userData: SignUpData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Sign-up failed');
  }

  return response.json();
};

export const signInHandler = async (credentials: SignInData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Sign-in failed');
  }

  return response.json();
};