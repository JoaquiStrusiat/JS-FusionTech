import { useState } from "react";

export default function useDataUser(){
    const [user, setUser] = useState(null);

    const loginMutation = async ({ email, password }) => {
        const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
      
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }
        setUser(email)
        localStorage.setItem('user', JSON.stringify({email}) );
        return response.json();
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('cartShop');
    };
    return{user, setUser, loginMutation, handleLogout}
}

