import { useState, useEffect } from 'react'; // Adicione useEffect
import { useAuth } from '../../context/AuthContext';
import Button from '../Button';
import Input from '../Input';
import styles from './styles.module.css';
import { XIcon } from '@phosphor-icons/react';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
    const { user, updateUserProfile } = useAuth();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [isOpen, user]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await updateUserProfile({ name, email });
            alert('Perfil atualizado com sucesso!');
            onClose();
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar perfil.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>Editar Perfil</h3>
                    <button onClick={onClose} className={styles.closeBtn}><XIcon size={24} /></button>
                </div>

                <div className={styles.formGroup}>
                    <label>Nome Completo</label>
                    <Input 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        placeholder="Seu nome" 
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>E-mail</label>
                    <Input 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        type="email" 
                        placeholder="Seu e-mail" 
                    />
                </div>
                
                <div className={styles.actions}>
                    <Button 
                        text="Cancelar" 
                        color="secondary" 
                        onClick={onClose} 
                        type="button"
                    />
                    <Button 
                        text={loading ? "Salvando..." : "Salvar"} 
                        onClick={handleSubmit} 
                        type="submit"
                    />
                </div>
            </div>
        </div>
    );
}