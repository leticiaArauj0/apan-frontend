import Button from '../../components/Button'
import CardStyles from '../../shared/styles/Card.module.css'
import styles from './styles.module.css'
import logoImage from '../../assets/logo.png'
import Input from '../../components/Input'

export function Login() {
    return(
        <div className={CardStyles.card}>
            <img className={CardStyles.img} src={logoImage}/>
            <p className={CardStyles.title}>Log in</p>
            <div className={styles.containerInputs}>
                <Input placeholder='Email'/>
                <Input type='password' placeholder='Senha'/>
                <span className={styles.forgetPassword}>Esqueceu a senha?</span>
            </div>
            <Button text='login' color='primary' size='medium'></Button>
        </div>
    )
}
