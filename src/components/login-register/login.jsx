import { useMutation } from '@tanstack/react-query';
import { useContext, useState} from 'react';
import { AuthContext } from '../App';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import style from './log.module.css';

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';

    const {loginMutation} = useContext(AuthContext)

    const mutation = useMutation({
        mutationFn: ({ email, password }) => loginMutation({ email, password }),
        onSuccess: () => {
        },
        onError: () => {
          alert('Usuario o contraseña incorrectas');
        },
    });

    return (
        <div className={style.content}>
            <div className={style.form}>
                <h3>Login</h3>
                {from && from !== '/' && (
                  <p>Regístrese para acceder a {from}</p>
                )}
                <input 
                    type="text" 
                    placeholder='Email'
                    value={email} 
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <input 
                    type="password" 
                    placeholder='Password'
                    value={password} 
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <p>Para registrarte haz <Link to="/register"> clic aquí</Link></p>
                <button 
                onClick={()=>{mutation.mutate({ email, password }); navigate(from, { replace: true });}}>
                    Entar
                </button> 
            </div>
        </div>
    );
}