import Button from '../../components/Button'
import Input from '../../components/Input'
import CardStyles from '../../shared/styles/Card.module.css'
import logoImage from '../../assets/logo.png'

export function Register() {
    return(
        <div className={CardStyles.card}>
            <img className={CardStyles.img} src={logoImage}/>
            <p className={CardStyles.title}>Cadastro</p>
            <div>
                <Input placeholder='Nome'/>
                <Input type='emaiil' placeholder='Email'/>
                <Input type='password' placeholder='Senha'/>
                <Input type='password' placeholder='Confirmar senha'/>            
            </div>
            <Button text='Registrar' color='primary' size='medium'></Button>
        </div>
    )
}
