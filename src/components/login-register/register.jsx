import { useMutation } from '@tanstack/react-query';
import { useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import style from './log.module.css';

const registerMutation = async ({ name, email, password, avatar }) => {
    const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, avatar }),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  };


export default function Register(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';

    const mutation = useMutation({
        mutationFn: ({ name, email, password }) =>
          registerMutation({
            name,
            email,
            password,
            avatar: 'https://picsum.photos/800', // Valor por defecto del avatar
          }),
        onSuccess: () => {
            alert('Usuario creado correctamente');
        },
        onError: (error) => {
            alert('Algo salió mal :(', {error});
        },
      });

    return(
        <div className={style.content}>
            <div className={style.form}>
                <h3>Registrate</h3>
                <input 
                    type="text" 
                    placeholder='Username'
                    value={name}
                    required 
                    onChange={(e)=>{setName(e.target.value)}}
                />
                <input 
                    type="text" 
                    placeholder='Email'
                    value={email} 
                    required
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <input 
                    type="password" 
                    placeholder='Password'
                    value={password}
                    required 
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <button 
                onClick={()=>{mutation.mutate({ name, email, password }); navigate(from, { replace: true });}}>
                    Entar
                </button> 
            </div>
        </div>
    );
}