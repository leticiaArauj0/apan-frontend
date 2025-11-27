import CardStyles from '../../shared/styles/Card.module.css'
import logoImage from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';

export function ResetPassword() {
    const { token } = useParams(); 
    const navigate = useNavigate();
    const { resetPasswordConfirm } = useAuth();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!token) {
            setError('Token inválido ou ausente.');
            return;
        }

        if (password.length < 8) {
            setError('A senha deve ter no mínimo 8 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            await resetPasswordConfirm(token, password);
            setSuccess(true);
            
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err: any) {
            console.error(err);
            setError('Erro ao redefinir. O link pode ter expirado.');
        }
    };

    if (success) {
        return (
            <div className={CardStyles.card}>
                <img src={logoImage} className={CardStyles.img} alt="Logo" />
                <h2 style={{ color: 'green', margin: '20px 0' }}>Senha Alterada!</h2>
                <p>Sua senha foi redefinida com sucesso.</p>
                <p>Você será redirecionado para o login...</p>
                <Button text='Ir para Login' onClick={() => navigate('/login')} />
            </div>
        );
    }

    return(
        <form className={CardStyles.card} onSubmit={handleSubmit}>
            <img className={CardStyles.img} src={logoImage} alt="Logo"/>
            <p className={CardStyles.title}>Nova senha</p>          
            <div style={{ width: '100%' }}>
                <div className={CardStyles.inputContainer}>
                    <Input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder='Senha' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className={CardStyles.iconButton}
                    >
                        {showPassword ? <EyeIcon size={24} color='#003333' /> : <EyeSlashIcon size={24} color='#003333' />}
                    </button>
                </div>
                <div className={CardStyles.inputContainer}>
                    <Input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        placeholder='Confirmar senha'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                        className={CardStyles.iconButton}
                    >
                        {showConfirmPassword ? <EyeIcon size={24} color='#003333' /> : <EyeSlashIcon size={24} color='#003333' />}
                    </button>
                </div>
            </div>

            {error && (
                <span style={{ color: 'red', fontSize: '1rem', marginBottom: '10px', display: 'block' }}>
                    {error}
                </span>
            )}

            <Button text='Confirmar' type='submit'/>
        </form>
    )
}