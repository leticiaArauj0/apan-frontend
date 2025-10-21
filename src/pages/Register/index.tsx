import Button from '../../components/Button'
import styles from './styles.module.css'
import logoImage from '../../assets/logo.png'
import Input from '../../components/Input'

export function Register() {
    return(
        <div className={styles.card}>
            <img className={styles.img} src={logoImage}/>
            <p className={styles.title}>Cadastro</p>
            <div>
                <Input placeholder='Nome'/>
                <Input placeholder='Email'/>
                <Input type='password' placeholder='Senha'/>
                <Input type='password' placeholder='Confirmar senha'/>
            </div>
            <Button text='Registrar' color='primary' size='medium'></Button>
        </div>
    )
}
