import styles from './styles.module.css'
import CardStyles from '../../shared/styles/Card.module.css'
import logoImage from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext' // Importe o contexto

export function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const { forgotPassword } = useAuth(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (!email) {
            setMessage({ type: 'error', text: 'Por favor, digite seu email.' });
            return;
        }

        try {
            setLoading(true);
            await forgotPassword(email);
            setMessage({ 
                type: 'success', 
                text: 'Email enviado! Verifique sua caixa de entrada e spam.' 
            });
            setEmail('');
        } catch (err) {
            console.error(err);
            setMessage({ 
                type: 'error', 
                text: 'Erro ao enviar. Verifique se o email está correto.' 
            });
        } finally {
            setLoading(false);
        }
    };

    return(
        <form className={CardStyles.card} onSubmit={handleSubmit}>
            <img className={CardStyles.img} src={logoImage} alt="Logo APAN" />
            <p className={CardStyles.title}>Redefinir Senha</p>
            
            <span className={styles.text}>
                Digite seu email e enviaremos as instruções para redefinir a senha.
            </span>

            <div style={{ width: '100%', margin: '15px 0' }}>
                <Input 
                    type='email' 
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {message && (
                <span style={{ 
                    color: message.type === 'success' ? 'green' : 'red', 
                    fontSize: '14px', 
                    marginBottom: '10px', 
                    display: 'block', 
                    textAlign: 'center' 
                }}>
                    {message.text}
                </span>
            )}

            <Button 
                text={loading ? 'Enviando...' : 'Enviar'} 
                type="submit" 
            />

            <div style={{ marginTop: '15px', fontSize: '1rem', textAlign: 'center' }}>
                <Link to="/login" style={{ color: '#003333', textDecoration: 'none', fontWeight: 'bold' }}>
                    Voltar para o Login
                </Link>
            </div>
        </form>
    )
}