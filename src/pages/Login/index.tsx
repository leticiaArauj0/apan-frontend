import Button from '../../components/Button'
import CardStyles from '../../shared/styles/Card.module.css'
import styles from './styles.module.css'
import logoImage from '../../assets/logo.png'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
  
    const { login } = useAuth();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError('Preencha todos os campos para continuar.');
            return;
        }

        if (!emailRegex.test(email)) {
            setError('O formato do e-mail é inválido.');
            return;
        }

        if (password.length < 8) {
            setError('A senha deve ter no mínimo 8 caracteres.');
            return;
        }

        try {
            await login(email, password); 
        } catch (err) {
            console.error(err);
            setError('Email ou senha incorretos.');
        }
    };
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (error) setError(null); 
    };
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (error) setError(null);
    };

    return(
        <form className={CardStyles.card} onSubmit={handleSubmit}>
            <img className={CardStyles.img} src={logoImage} alt="Logo APAN"/>
            <p className={CardStyles.title}>Log in</p>
            
            <div className={styles.containerInputs}>
                <Input 
                    type='email' 
                    placeholder='Email' 
                    value={email} 
                    onChange={handleEmailChange}
                />
                
                <div className={CardStyles.inputContainer}>
                    <Input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder='Senha' 
                        value={password} 
                        onChange={handlePasswordChange}
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className={CardStyles.iconButton}
                    >
                        {showPassword ? <EyeIcon size={24} /> : <EyeSlashIcon size={24} />}
                    </button>
                </div>
                
                <Link className={styles.forgetPassword} to='/forget-password'>
                    <span>Esqueceu a senha?</span>
                </Link>

                {error && (
                        <span style={{ marginTop: '0.8rem', color: 'red', fontSize: '1rem', display: 'block', textAlign: 'center' }}>
                            {error}
                        </span>
                    )}
            </div>

            <Button text='login' color='primary' size='medium' type='submit' />
        </form>
    )
}