import ContainerStyles from '../../shared/styles/Container.module.css'
import { Header } from "../../components/Header"
import Button from "../../components/Button"
import Input from "../../components/Input"
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { PlusIcon, CopyIcon, XIcon, TrashIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import api from '../../services/api'

interface Project {
    id: number;
    name: string;
    description: string;
    join_code: string;
    my_role: 'Gerente' | 'Participante';
}

export function Home() {
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [joinCodeInput, setJoinCodeInput] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        try {
            const response = await api.get('/users/projects');
            setProjects(response.data);
        } catch (error) {
            console.error("Erro ao buscar projetos:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleFabClick = () => {
        if (user?.role === 'Gerente de Projetos') {
            navigate('/create-project');
        } else {
            setIsModalOpen(true);
        }
    };

    const handleJoinProject = async () => {
        if (!joinCodeInput) return;

        try {
            await api.post('/users/projects/join', { code: joinCodeInput });
            setIsModalOpen(false);
            setJoinCodeInput('');
            fetchProjects();
        } catch (error: any) {
            alert(error.response?.data?.error || 'Erro ao entrar no projeto.');
        }
    };

    const handleDeleteProject = async (e: React.MouseEvent, projectId: number) => {
        e.stopPropagation();
        const confirm = window.confirm(
            "Tem certeza que deseja excluir este projeto?\nIsso apagará todas as metas e ações vinculadas."
        );

        if (!confirm) return;

        try {
            await api.delete(`users/projects/${projectId}`);
            
            setProjects(currentProjects => currentProjects.filter(p => p.id !== projectId));
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir projeto. Verifique se você é o gerente.');
        }
    };

    const copyToClipboard = (e: React.MouseEvent, code: string) => {
        e.stopPropagation();
        navigator.clipboard.writeText(code);
        alert(`Código ${code} copiado!`);
    };

    return(
        <div className={ContainerStyles.container}>
            <Header/> 
            
            <div className={styles.dashboard}>
                {loading && <p style={{ padding: '0 2rem', width: '100%', position: 'absolute', height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: '#666', marginTop: '2rem', fontSize: '1.5rem'}}>Carregando projetos...</p>}

                {!loading && projects.length === 0 && (
                    <div style={{ padding: '0 2rem', width: '100%', position: 'absolute', height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: '#666', marginTop: '2rem', fontSize: '1.5rem'}}>
                        Você ainda não tem projetos. Clique no "+" para começar.
                    </div>
                )}

                {!loading && projects.map(project => (
                    <div 
                        key={project.id} 
                        className={styles.projectCard} 
                        onClick={() => navigate(`/project/${project.id}`)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span style={{ 
                                fontSize: '0.75rem', 
                                background: project.my_role === 'Gerente' ? '#e0f2f1' : '#fff3e0',
                                color: project.my_role === 'Gerente' ? '#00695c' : '#e65100',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}>
                                {project.my_role}
                            </span>
                            
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <button 
                                    title="Copiar código de acesso"
                                    onClick={(e) => copyToClipboard(e, project.join_code)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center' }}
                                >
                                    <span style={{ fontSize: '0.8rem', marginRight: '5px' }}>{project.join_code}</span>
                                    <CopyIcon size={16} />
                                </button>

                                {project.my_role === 'Gerente' && (
                                    <button
                                        title="Excluir Projeto"
                                        onClick={(e) => handleDeleteProject(e, project.id)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d32f2f', display: 'flex', alignItems: 'center' }}
                                    >
                                        <TrashIcon size={18} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div style={{ marginTop: '10px' }}>
                            <h3 className={styles.cardTitle}>{project.name}</h3>
                            <p className={styles.cardDesc}>{project.description}</p>
                        </div>
                        
                        <span style={{ fontSize: '0.8rem', color: '#2E8B57', marginTop: 'auto', paddingTop: '10px', fontWeight: '600' }}>
                            Acessar Painel →
                        </span>
                    </div>
                ))}
                <button className={styles.fabButton} onClick={handleFabClick} title="Adicionar Projeto">
                    <PlusIcon size={32} weight="bold" />
                </button>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>Entrar em um Projeto</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                                <XIcon size={24} />
                            </button>
                        </div>
                        
                        <p style={{ margin: '10px 0', fontSize: '0.9rem', color: '#555' }}>
                            Peça o código para o seu gerente (Ex: APAN-A1B2)
                        </p>
                        
                        <Input 
                            placeholder="Código do Projeto"
                            value={joinCodeInput}
                            onChange={(e) => setJoinCodeInput(e.target.value)}
                        />

                        <div className={styles.modalButtons}>
                            <Button 
                                text="Cancelar" 
                                color="secondary" 
                                onClick={() => setIsModalOpen(false)} 
                            />
                            <Button 
                                text="Entrar" 
                                color="primary" 
                                onClick={handleJoinProject} 
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}