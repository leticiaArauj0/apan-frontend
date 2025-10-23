import CardStyles from '../../shared/styles/Card.module.css'
import logoImage from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'

export function ResetPassword() {
    return(
        <div className={CardStyles.card}>
            <img src={logoImage}/>
            <p className={CardStyles.title}>Nova senha</p>
            <div>
                <Input type='password' placeholder='Nova senha'/>
                <Input type='password' placeholder='Confirmar senha'/>
            </div>
            <Button text='Confirmar'/>
        </div>
    )
}