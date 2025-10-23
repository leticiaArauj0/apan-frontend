import { Header } from "../../components/Header"
import Button from "../../components/Button"
import styles from './styles.module.css'

export function Home() {
    return(
        <div className={styles.container}>
            <Header/>
            <div className={styles.dashboard}>
                <Button text="Criar Projeto" size="large"/>
                <Button text="Editar Projeto" size="large"/>
                <Button text="Ver Projeto" size="large"/>
                <Button text="Excluir Projeto" size="large"/>
                <Button text="Perfil" size="large"/>
            </div>
        </div>
    )
}
