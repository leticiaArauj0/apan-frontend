import styles from './styles.module.css'
import CardStyles from '../../shared/styles/Card.module.css'
import logoImage from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'

export function ForgetPassword() {
    return(
        <div className={CardStyles.card}>
            <img className={CardStyles.img} src={logoImage} alt="" />
            <p className={CardStyles.title}>Redefinir Senha</p>
            <span className={styles.text}>
                Digite seu email e enviaremos as intruções para redefinir senha
            </span>
            <Input type='email' placeholder='Email'/>
            <Button text='Enviar'/>
        </div>
    )
}