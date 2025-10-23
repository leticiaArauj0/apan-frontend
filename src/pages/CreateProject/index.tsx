import ContainerStyles from '../../shared/styles/Container.module.css'
import styles from './styles.module.css'
import { Header } from '../../components/Header'
import Input from '../../components/Input'

export function CreateProject() {
    return(
        <div className={ContainerStyles.container}>
            <Header/>
            <div className={styles.containerCreate}>
                <div>
                    <label>Nome do Projeto</label>
                    <Input placeholder='Digite o nome do projeto'/>
                </div>
                <div>
                    <label>Responsavel</label>
                    <Input placeholder='Digite o nome do responsável'/>
                </div>
                <div>
                    <label>Descrição</label>
                    <textarea placeholder='Digite a descrição do projeto' required/>
                </div>
                <div>
                    <label>Imagem</label>
                    <Input type='file' placeholder=''/>
                </div>
            </div>
        </div>
    )
}
