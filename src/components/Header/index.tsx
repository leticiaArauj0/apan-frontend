import styles from './styles.module.css'
import { MagnifyingGlassIcon, SignOutIcon } from '@phosphor-icons/react'
import logoImage from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'


export function Header() {
    const navigate = useNavigate()

    return(
        <div className={styles.container}>
            <Link to='/home'>
                <img className={styles.image} src={logoImage} />
            </Link>
            <div className={styles.containerInput}>
                <input className={styles.input} placeholder='Pesquisar' type="text" />
                <MagnifyingGlassIcon className={styles.icon} size={32} weight='bold' />
            </div>
            <button className={styles.button} onClick={() => navigate('/login')}>
                Sair
                <SignOutIcon size={32} />
            </button>
        </div>
    )
}
