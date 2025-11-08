import Button from '../../components/Button'
import CardStyles from '../../shared/styles/Card.module.css'
import styles from './styles.module.css'
import logoImage from '../../assets/logo.png'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react'

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const { login } = useAuth();

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(email, password); 
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return(
        <form className={CardStyles.card} onSubmit={handleSubmit}>
            <img className={CardStyles.img} src={logoImage}/>
            <p className={CardStyles.title}>Log in</p>
            <div className={styles.containerInputs}>
                <Input type='email' placeholder='Email' value={email} onChange={handleEmailChange}/>
                <Input type='password' placeholder='Senha' value={password} onChange={handlePasswordChange}/>
                <Link className={styles.forgetPassword} to='/forget-password'>
                    <span>Esqueceu a senha?</span>
                </Link>
            </div>

            <Button text='login' color='primary' size='medium' type='submit' />
        </form>
    )
}
