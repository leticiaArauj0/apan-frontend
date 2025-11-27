import Button from '../../components/Button'
import Input from '../../components/Input'
import CardStyles from '../../shared/styles/Card.module.css'
import logoImage from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const { register } = useAuth();

    const roles = [
        { value: '', label: 'Selecione sua função' },
        { value: 'Gerente de Projetos', label: 'Gerente de Projetos' },
        { value: 'Gerente do Projeto', label: 'Gerente do Projeto' },
        { value: 'Assistente Social', label: 'Assistente Social' },
        { value: 'Secretaria', label: 'Secretaria' }
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('As senhas são diferentes!');
            return;
        }

        if (!name || !email || !password || !role) {
            setError('Preencha todos os campos e selecione uma função.');
            return;
        }
        
        try {
            await register(name, email, password, role);
        } catch (err) {
            setError('Erro ao realizar cadastro. Tente novamente.');
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

    return(
        <form className={CardStyles.card} onSubmit={handleSubmit}>
            <img className={CardStyles.img} src={logoImage} alt="Logo"/>
            <p className={CardStyles.title}>Cadastro</p>

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
                <select 
                    className={CardStyles.select || 'select-standard'}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    {roles.map((option) => (
                        <option 
                            key={option.value} 
                            value={option.value} 
                            disabled={option.value === ''}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
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
                        {showPassword ? <EyeIcon size={24} color='#003333' /> : <EyeSlashIcon size={24} color='#003333' />}
                    </button>
                </div>
                <div className={CardStyles.inputContainer}>
                    <Input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        placeholder='Confirmar senha' 
                        value={confirmPassword} 
                        onChange={handleConfirmPasswordChange} 
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                        className={CardStyles.iconButton}
                    >
                        {showConfirmPassword ? <EyeIcon size={24} color='#003333' /> : <EyeSlashIcon size={24} color='#003333' />}
                    </button>
                </div>
                {error && (
                    <span style={{ marginTop: '0.8rem', color: 'red', fontSize: '1rem', display: 'block', textAlign: 'center' }}>
                        {error}
                    </span>
                )}
            </div>
            
            <Button text='Registrar' color='primary' size='medium' type='submit' />

            <div style={{fontSize: '1rem', textAlign: 'center' }}>
                <span>Já possui conta? </span>
                <Link to="/login" style={{ color: '#003333', textDecoration: 'none', fontWeight: 'bold' }}>
                    Clique aqui para logar
                </Link>
            </div>
        </form>
    )
}