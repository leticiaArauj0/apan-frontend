import Button from '../../components/Button'
import CardStyles from '../../shared/styles/Card.module.css'
import styles from './styles.module.css'
import logoImage from '../../assets/logo.png'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'

export function Login() {
    return(
        <div className={CardStyles.card}>
            <img className={CardStyles.img} src={logoImage}/>
            <p className={CardStyles.title}>Log in</p>
            <div className={styles.containerInputs}>
                <Input type='email' placeholder='Email'/>
                <Input type='password' placeholder='Senha'/>
                <Link className={styles.forgetPassword} to='/forget-password'>
                    <span>Esqueceu a senha?</span>
                </Link>
            </div>
            <Button text='login' color='primary' size='medium'></Button>
        </div>
    )
}
