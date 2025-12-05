import ContainerStyles from '../../shared/styles/Container.module.css'
import styles from './styles.module.css'
import { Header } from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'

export function CreateProject() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        target_audience: '',
        start_date: '',
        end_date: '',
        budget: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.start_date || !formData.end_date) {
            alert('Por favor, preencha os campos obrigatórios.');
            return;
        }

        try {
            setLoading(true);
            
            await api.post('/users/projects', {
                ...formData,
                budget: parseFloat(formData.budget) || 0
            });
            navigate('/home');

        } catch (error) {
            console.error(error);
            alert('Erro ao criar projeto. Verifique os dados.');
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className={ContainerStyles.container}>
            <Header/>
            
            <div className={styles.containerCreate}>
                <h2 style={{ color: '#003333' }}>Novo Projeto</h2>

                <div className={styles.formGroup}>
                    <label>Nome do Projeto *</label>
                    <Input 
                        name="name"
                        placeholder='Ex: Paraolimpíadas 2024' 
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Público Alvo</label>
                    <Input 
                        name="target_audience"
                        placeholder='Ex: Jovens de 14 a 18 anos'
                        value={formData.target_audience}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.row}>
                    <div className={styles.formGroup}>
                        <label>Data de Início *</label>
                        <Input 
                            name="start_date"
                            type='date' 
                            value={formData.start_date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Data de Término *</label>
                        <Input 
                            name="end_date"
                            type='date' 
                            value={formData.end_date}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Orçamento Total (R$)</label>
                    <Input 
                        name="budget"
                        type='number' 
                        placeholder='0,00'
                        value={formData.budget}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Descrição Detalhada</label>
                    <textarea 
                        name="description"
                        className={styles.textarea} 
                        placeholder='Descreva as ações e objetivos do projeto...' 
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.containerButton}>
                    <Button 
                        text='Cancelar' 
                        color='secondary' 
                        onClick={() => navigate('/home')}
                        type="button"
                    />
                    <Button 
                        text={loading ? 'Salvando...' : 'Salvar Projeto'} 
                        onClick={handleSubmit}
                        type="button"
                    />
                </div>
            </div>
        </div>
    )
}