import Button from '../../components/Button'
import Input from '../../components/Input'
import CardStyles from '../../shared/styles/Card.module.css'
import logoImage from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
  
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('As senhas não conferem!');
            return;
        }
        
        await register(name, email, password); 
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    return(
        <form className={CardStyles.card} onSubmit={handleSubmit}>
            <img className={CardStyles.img} src={logoImage}/>
            <p className={CardStyles.title}>Cadastro</p>

            {error && <p>{error}</p>}


            <div>
                <Input 
                    placeholder='Nome' 
                    value={name} 
                    onChange={handleNameChange} 
                />
                
                <Input 
                    type='email' 
                    placeholder='Email' 
                    value={email} 
                    onChange={handleEmailChange} 
                />
                <Input 
                    type='password' 
                    placeholder='Senha' 
                    value={password} 
                    onChange={handlePasswordChange} 
                />
                <Input 
                    type='password' 
                    placeholder='Confirmar senha' 
                    value={confirmPassword} 
                    onChange={handleConfirmPasswordChange} 
                />
            </div>
            
            <Button text='Registrar' color='primary' size='medium' type='submit' />
        </form>
    )
}