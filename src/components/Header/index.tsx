import styles from './styles.module.css';
import logoImage from '../../assets/logo.png';
import { SignOutIcon, CaretDownIcon, UserCircleIcon, PencilSimpleIcon } from '@phosphor-icons/react';
import { useAuth } from '../../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { EditProfileModal } from '../EditProfileModal';
import { useNavigate } from 'react-router-dom';
export function Header() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate()
    
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className={styles.container}>
                <img src={logoImage} alt="Logo APAN" className={styles.image} onClick={() => navigate('/home')} />

                <h1 className={styles.title}>Associação Paradesportiva do Norte</h1>

                <div 
                    className={styles.profileContainer} 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    ref={menuRef}
                >
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{user?.name}</span>
                        <span className={styles.userRole}>{user?.role}</span>
                    </div>
                    
                    <UserCircleIcon size={42} color="#003333" weight="light" />
                    <CaretDownIcon size={16} color="#666" weight="bold" />

                    {isMenuOpen && (
                        <div className={styles.dropdownMenu}>
                            <button 
                                className={styles.menuItem}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditModalOpen(true);
                                    setIsMenuOpen(false);
                                }}
                            >
                                <PencilSimpleIcon size={18} />
                                Editar Perfil
                            </button>
                            
                            <button 
                                className={`${styles.menuItem} ${styles.logout}`}
                                onClick={() => {
                                    logout();
                                }}
                            >
                                <SignOutIcon size={18} />
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <EditProfileModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
            />
        </>
    );
}
