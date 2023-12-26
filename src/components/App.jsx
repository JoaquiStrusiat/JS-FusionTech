import { useContext, createContext, useEffect} from 'react';

//importación de componentes
import Header from './header/header.jsx';
import Container from './container/container.jsx';
import BuyProducts from './buyProducts/buyProducts.jsx';
import Error404 from './loader-error/error404.jsx';
import Login from './login-register/login.jsx';
import Register from './login-register/register.jsx';

//importacion de react-router
import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from 'react-router-dom';

//importación de Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//importacion de mis customHooks
import useDataUser from '../customHooks/useDataUser.jsx';

export const AuthContext = createContext(null);
const queryClient = new QueryClient();

function App() {
  const {user, setUser, loginMutation, handleLogout} = useDataUser();
  const value ={
    user,
    loginMutation,
    handleLogout
  }
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      setUser(JSON.parse(storedUser))
    }
  },[])
  return (
    <AuthContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header/>
          <Routes>
            <Route index path='/' element={<Container/>}/>
            <Route path='/buyproducts' element={
              <ProtectedRoute>
                <BuyProducts/>
              </ProtectedRoute>
              }/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='*' element={<Error404/>}/>
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthContext.Provider>
      
  );
}
function ProtectedRoute({ children }){
  const {user} = useContext(AuthContext);
  const currentLocation = useLocation();
  
  if(!user){
    return <Navigate to='/login' state={{from: currentLocation}} replace/>
  }
  return children;
}

export default App;
