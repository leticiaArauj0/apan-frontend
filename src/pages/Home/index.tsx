import ContainerStyles from '../../shared/styles/Container.module.css'
import { Header } from "../../components/Header"
import Button from "../../components/Button"
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'

export function Home() {
    const navigate = useNavigate()

    return(
        <div className={ContainerStyles.container}>
            <Header/>
            <div className={styles.dashboard}>
                <Button text="Criar Projeto" size="large" onClick={() => navigate('/create-project')}/>
                <Button text="Editar Projeto" size="large"/>
                <Button text="Ver Projeto" size="large"/>
                <Button text="Excluir Projeto" size="large"/>
                <Button text="Perfil" size="large"/>
            </div>
        </div>
    )
}
