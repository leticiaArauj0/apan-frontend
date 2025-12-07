import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Header } from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ContainerStyles from '../../shared/styles/Container.module.css';
import styles from './styles.module.css';
import { 
    UsersIcon, 
    CurrencyDollarIcon, 
    ChartLineUpIcon, 
    CopyIcon, 
    CalendarIcon, 
    UserIcon, 
    TargetIcon, 
    XIcon,
    PencilIcon,
    TrashIcon
} from '@phosphor-icons/react';
import { useAuth } from '../../context/AuthContext';

interface Goal {
    id: number;
    title: string;
    description: string;
    type: 'QUANTITATIVE' | 'QUALITATIVE';
    target_value: number | null;
    latest_value: number | null;
    latest_comment: string | null;
}

interface Action {
    id: number;
    title: string;
    type: string;
    description: string;
    date: string;
    status: string;
}

interface ProjectDetails {
    id: number;
    name: string;
    description: string;
    join_code: string;
    start_date: string;
    end_date: string;
    budget: string;
    student_count: string;
    manager_id: number;
    manager_name: string;
    goals: Goal[];
    actions: Action[];
}

interface Student {
    id: number;
    name: string;
    email: string;
}

export function ProjectDashboard() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [project, setProject] = useState<ProjectDetails | null>(null);
    const [loading, setLoading] = useState(true);

    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false);
    const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [progressData, setProgressData] = useState({ value: '', comment: '' });   
    
    const [studentsList, setStudentsList] = useState<Student[]>([]);
    const [loadingStudents, setLoadingStudents] = useState(false);

    const [editFormData, setEditFormData] = useState({
        name: '', description: '', target_audience: '', start_date: '', end_date: '', budget: ''
    });

    const [newGoal, setNewGoal] = useState({
        title: '', description: '', type: 'QUANTITATIVE', target_value: ''
    });

    const [newAction, setNewAction] = useState({
        title: '', type: 'AULA', date: '', description: ''
    });


    async function fetchProject() {
        try {
            const response = await api.get(`users/projects/${id}`); 
            setProject(response.data);

            const p = response.data;
            setEditFormData({
                name: p.name,
                description: p.description,
                target_audience: p.target_audience || '',
                start_date: p.start_date.split('T')[0],
                end_date: p.end_date.split('T')[0],
                budget: p.budget
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchStudents() {
        try {
            setLoadingStudents(true);
            const response = await api.get(`users/projects/${id}/students`);
            setStudentsList(response.data);
        } catch (error) {
            console.error("Erro ao buscar alunos", error);
            alert("Erro ao carregar lista de participantes.");
        } finally {
            setLoadingStudents(false);
        }
    }
    useEffect(() => {
        fetchProject();
    }, [id]);

    const handleUpdateProject = async () => {
        try {
            await api.put(`users/projects/${id}`, editFormData);
            setIsEditProjectModalOpen(false);
            fetchProject();
        } catch (error) {
            alert('Erro ao atualizar projeto.');
        }
    };

    const handleDeleteGoal = async (goalId: number) => {
        if (!window.confirm("Tem certeza que deseja excluir esta meta?")) return;
        try {
            await api.delete(`users/goals/${goalId}`);
            fetchProject();
        } catch (error) {
            alert('Erro ao excluir meta.');
        }
    };

    const handleDeleteAction = async (actionId: number) => {
        if (!window.confirm("Tem certeza que deseja excluir esta ação?")) return;
        try {
            await api.delete(`users/actions/${actionId}`);
            fetchProject();
        } catch (error) {
            alert('Erro ao excluir ação.');
        }
    };

    const handleSubmitProgress = async () => {
        if (!selectedGoal) return;

        try {
            await api.post(`users/goals/${selectedGoal.id}/progress`, {
                current_value: selectedGoal.type === 'QUANTITATIVE' ? Number(progressData.value) : null,
                comments: progressData.comment
            });
            
            setIsUpdateModalOpen(false);
            fetchProject();
        } catch (error) {
            alert('Erro ao atualizar progresso.');
        }
    };

    const handleOpenUpdateModal = (goal: Goal) => {
        setSelectedGoal(goal);
        setProgressData({ 
            value: goal.latest_value ? String(goal.latest_value) : '', 
            comment: '' 
        });
        setIsUpdateModalOpen(true);
    };

    const handleCreateGoal = async () => {
        if (!newGoal.title) return alert('Dê um título para a meta');
        try {
            await api.post(`users/projects/${id}/goals`, {
                ...newGoal,
                target_value: newGoal.type === 'QUANTITATIVE' ? Number(newGoal.target_value) : null
            });
            setIsGoalModalOpen(false);
            setNewGoal({ title: '', description: '', type: 'QUANTITATIVE', target_value: '' });
            fetchProject(); 
        } catch (error) {
            alert('Erro ao criar meta.');
        }
    };

    const handleCreateAction = async () => {
        if (!newAction.title || !newAction.date) return alert('Preencha título e data');
        try {
            await api.post(`users/projects/${id}/actions`, newAction);
            setIsActionModalOpen(false);
            setNewAction({ title: '', type: 'AULA', date: '', description: '' });
            fetchProject();
        } catch (error) {
            alert('Erro ao registrar ação.');
        }
    };

    const handleOpenStudentsModal = () => {
        setIsStudentsModalOpen(true);
        fetchStudents();
    }

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
        alert(`Código ${code} copiado!`);
    };


    if (loading || !project) {
        return (
            <div className={ContainerStyles.container}>
                <Header />
                <div className={styles.container}>
                   <p>Carregando projetos...</p>
                </div>
            </div>
        )
    }
    
    const formatDate = (date: string) => new Date(date).toLocaleDateString('pt-BR');
    const formatCurrency = (val: string) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(val));

    const isManager = user?.id === project.manager_id;

    return (
        <div className={ContainerStyles.container}>
            <Header />
            
            <div className={styles.container}>
                <header className={styles.headerCard}>
                    <div className={styles.headerTopInfo}>
                        <div 
                            className={styles.badge} 
                            onClick={() => copyToClipboard(project.join_code)} 
                            title="Clique para copiar"
                        >
                            Código: {project.join_code} <CopyIcon size={14} />
                        </div>

                        <div className={styles.buttonContainer}>
                            <Button text="Adicionar Meta" size="medium" onClick={() => setIsGoalModalOpen(true)} />
                            <Button text="Registrar Ação" size="medium" color="secondary" onClick={() => setIsActionModalOpen(true)} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem'}}>
                        <h1 className={styles.projectTitle}>{project.name}</h1>
                        {isManager && (
                            <button 
                                onClick={() => setIsEditProjectModalOpen(true)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#003333', marginRight: '10px' }}
                                title="Editar Projeto"
                            >
                                <PencilIcon size={24} />
                            </button>
                        )}
                    </div>
                    
                    <p className={styles.projectDescription}>{project.description}</p>
                    
                    
                    <div className={styles.metaInfoContainer}>
                        <div className={styles.metaInfoItem}>
                            <span className={styles.metaLabel}>Gerente</span>
                            <span className={styles.metaValue}>
                                <UserIcon size={20} color="#2E8B57" weight="fill" />
                                {project.manager_name}
                            </span>
                        </div>
                        <div className={styles.metaInfoItem}>
                            <span className={styles.metaLabel}>Período</span>
                            <span className={styles.metaValue}>
                                <CalendarIcon size={20} color="#2E8B57" weight="fill" />
                                {formatDate(project.start_date)} até {formatDate(project.end_date)}
                            </span>
                        </div>
                    </div>
                </header>

                {/* 2. Cards de Estatísticas */}
                <div className={styles.statsGrid}>
                    <div className={`${styles.statCard} ${styles.clickableCard}`} onClick={handleOpenStudentsModal}>
                        <div className={styles.iconContainer}>
                            <UsersIcon size={32} color="#2E8B57" weight="bold" />
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statNumber}>{project.student_count}</span>
                            <span className={styles.statLabel}>Funcionários Inscritos</span>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.iconContainer}>
                            <CurrencyDollarIcon size={32} color="#2E8B57" weight="bold" />
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statNumber}>{formatCurrency(project.budget)}</span>
                            <span className={styles.statLabel}>Orçamento Total</span>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.iconContainer}>
                            <ChartLineUpIcon size={32} color="#2E8B57" weight="bold" />
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statNumber}>{project.goals.length}</span>
                            <span className={styles.statLabel}>Metas Definidas</span>
                        </div>
                    </div>
                </div>

                {/* 3. Seção de Metas */}
                <div className={styles.sectionHeader}>
                    <TargetIcon size={28} color="#003333" weight="fill" />
                    <h2 className={styles.sectionTitle}>Acompanhamento de Metas</h2>
                </div>
                
                {project.goals.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', border: '2px dashed #ddd', borderRadius: '12px', color: '#888' }}>
                        <p>Nenhuma meta cadastrada ainda.</p>
                    </div>
                ) : (
                    <div className={styles.goalsContainer}>
                        {project.goals.map(goal => {
                            let percentage = 0;
                            if (goal.type === 'QUANTITATIVE' && goal.target_value) {
                                percentage = Math.min(100, ((goal.latest_value || 0) / goal.target_value) * 100);
                            }

                            return (
                                <div key={goal.id} className={`${styles.goalCard} ${goal.type === 'QUANTITATIVE' ? styles.quantitative : styles.qualitative}`} style={{position: 'relative'}}>
                                    
                                    {/* Botão Excluir Meta (Só Gerente) */}
                                    {isManager && (
                                        <button 
                                            onClick={() => handleDeleteGoal(goal.id)}
                                            style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: '#ff6b6b' }}
                                            title="Excluir Meta"
                                        >
                                            <TrashIcon size={18} />
                                        </button>
                                    )}

                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '30px' }}>
                                        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{goal.title}</h3>
                                        <span style={{ fontSize: '0.8rem', color: '#888' }}>
                                            {goal.type === 'QUANTITATIVE' ? 'Quantitativa' : 'Qualitativa'}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', margin: '10px 0' }}>{goal.description}</p>

                                    {goal.type === 'QUANTITATIVE' ? (
                                        <div style={{ marginTop: '15px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                                <span>Atual: {goal.latest_value || 0}</span>
                                                <span>Alvo: {goal.target_value}</span>
                                            </div>
                                            <div className={styles.progressBarBg}>
                                                <div 
                                                    className={styles.progressBarFill} 
                                                    style={{ width: `${percentage}%` }}
                                                    title={`${percentage.toFixed(1)}%`}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ marginTop: '15px' }}>
                                            <strong>Último registro:</strong>
                                            <div className={styles.commentBox}>
                                                {goal.latest_comment || "Nenhum registro qualitativo ainda."}
                                            </div>
                                        </div>
                                    )}

                                    <button 
                                        style={{ marginTop: '15px', background: 'none', border: 'none', color: '#00695c', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}
                                        onClick={() => handleOpenUpdateModal(goal)}
                                    >
                                        Atualizar Progresso
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 4. Seção de Ações (Histórico) */}
                <div className={styles.sectionHeader} style={{ marginTop: '3rem' }}>
                    <ChartLineUpIcon size={28} color="#003333" weight="fill" />
                    <h2 className={styles.sectionTitle}>Histórico de Atividades</h2>
                </div>

                {!project.actions || project.actions.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#888', fontStyle: 'italic' }}>
                        Nenhuma ação registrada neste projeto ainda.
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {project.actions.map(action => (
                            <div key={action.id} style={{ 
                                background: 'white', padding: '1.5rem', borderRadius: '12px', 
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                borderLeft: `5px solid ${action.type === 'AULA' ? '#2E8B57' : '#003333'}`,
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                position: 'relative'
                            }}>
                                {/* Botão Excluir Ação (Só Gerente) */}
                                {isManager && (
                                    <button 
                                        onClick={() => handleDeleteAction(action.id)}
                                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#ff6b6b' }}
                                        title="Excluir Ação"
                                    >
                                        <TrashIcon size={16} />
                                    </button>
                                )}

                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#333' }}>{action.title}</h4>
                                        <span style={{ 
                                            fontSize: '0.75rem', background: '#e0f2f1', color: '#00695c', 
                                            padding: '4px 8px', borderRadius: '6px', fontWeight: 'bold' 
                                        }}>
                                            {action.type}
                                        </span>
                                    </div>
                                    <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>{action.description}</p>
                                </div>
                                <div style={{ textAlign: 'right', minWidth: '120px', paddingRight: '20px' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#999', display: 'block', marginBottom: '4px' }}>
                                        Realizado em
                                    </span>
                                    <strong style={{ color: '#333', fontSize: '1rem' }}>
                                        {new Date(action.date).toLocaleDateString('pt-BR')}
                                    </strong>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal Nova Meta */}
                {isGoalModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h3>Nova Meta</h3>
                                <button className={styles.closeButton} onClick={() => setIsGoalModalOpen(false)}><XIcon size={24}/></button>
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label>Título da Meta</label>
                                <Input placeholder="Ex: Atender 50 beneficiários" value={newGoal.title} onChange={e => setNewGoal({...newGoal, title: e.target.value})} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Tipo de Meta</label>
                                <select 
                                    className={styles.selectInput}
                                    value={newGoal.type}
                                    onChange={e => setNewGoal({...newGoal, type: e.target.value})}
                                >
                                    <option value="QUANTITATIVE">Quantitativa (Numérica)</option>
                                    <option value="QUALITATIVE">Qualitativa (Descritiva)</option>
                                </select>
                            </div>

                            {newGoal.type === 'QUANTITATIVE' && (
                                <div className={styles.formGroup}>
                                    <label>Valor Alvo (Meta Final)</label>
                                    <Input type="number" placeholder="Ex: 100" value={newGoal.target_value} onChange={e => setNewGoal({...newGoal, target_value: e.target.value})} />
                                </div>
                            )}

                            <div className={styles.formGroup}>
                                <label>Descrição</label>
                                <Input placeholder="Detalhes da meta..." value={newGoal.description} onChange={e => setNewGoal({...newGoal, description: e.target.value})} />
                            </div>

                            <Button text="Salvar Meta" onClick={handleCreateGoal} />
                        </div>
                    </div>
                )}

                {/* Modal Registrar Ação */}
                {isActionModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h3>Registrar Ação / Atividade</h3>
                                <button className={styles.closeButton} onClick={() => setIsActionModalOpen(false)}><XIcon size={24}/></button>
                            </div>

                            <div className={styles.formGroup}>
                                <label>O que foi feito?</label>
                                <Input placeholder="Ex: Aula de Natação" value={newAction.title} onChange={e => setNewAction({...newAction, title: e.target.value})} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Tipo de Ação</label>
                                <select 
                                    className={styles.selectInput}
                                    value={newAction.type}
                                    onChange={e => setNewAction({...newAction, type: e.target.value})}
                                >
                                    <option value="AULA">Aula</option>
                                    <option value="TESTE">Teste / Avaliação</option>
                                    <option value="VISITA">Visita Domiciliar</option>
                                    <option value="SOCIOECONOMICO">Levantamento Socioeconômico</option>
                                    <option value="REUNIAO">Reunião</option>
                                    <option value="OUTRO">Outro</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Data da Realização</label>
                                <Input type="date" value={newAction.date} onChange={e => setNewAction({...newAction, date: e.target.value})} />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Observações</label>
                                <textarea 
                                    className={styles.textAreaInput}
                                    placeholder="Como foi a atividade?" 
                                    value={newAction.description} 
                                    onChange={e => setNewAction({...newAction, description: e.target.value})} 
                                    style={{minHeight: '80px', resize: 'vertical'}}
                                />
                            </div>

                            <Button text="Salvar Ação" onClick={handleCreateAction} />
                        </div>
                    </div>
                )}

                {/* Modal Listar Alunos */}
                {isStudentsModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h3>Funcionários Inscritos</h3>
                                <button className={styles.closeButton} onClick={() => setIsStudentsModalOpen(false)}><XIcon size={24}/></button>
                            </div>

                            {loadingStudents ? (
                                <p>Carregando lista...</p>
                            ) : (
                                <>
                                    {studentsList.length === 0 ? (
                                        <p style={{color: '#888'}}>Nenhum funcionário inscrito ainda.</p>
                                    ) : (
                                        <ul className={styles.studentsList}>
                                            {studentsList.map(student => (
                                                <li key={student.id} className={styles.studentItem}>
                                                    <UserIcon size={24} color="#aaa" />
                                                    <div>
                                                        <strong>{student.name}</strong>
                                                        <br />
                                                        <span style={{fontSize: '0.85rem', color: '#666'}}>{student.email}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Modal Editar Projeto */}
                {isEditProjectModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h3>Editar Projeto</h3>
                                <button className={styles.closeButton} onClick={() => setIsEditProjectModalOpen(false)}><XIcon size={24}/></button>
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label>Nome do Projeto</label>
                                <Input value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Descrição</label>
                                <Input value={editFormData.description} onChange={e => setEditFormData({...editFormData, description: e.target.value})} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Público Alvo</label>
                                <Input value={editFormData.target_audience} onChange={e => setEditFormData({...editFormData, target_audience: e.target.value})} />
                            </div>
                            <div className={`${styles.formGroup}, ${styles.containerDate}`}>
                                <div style={{flex: 1}}>
                                    <label>Início</label>
                                    <Input type="date" value={editFormData.start_date} onChange={e => setEditFormData({...editFormData, start_date: e.target.value})} />
                                </div>
                                <div style={{flex: 1}}>
                                    <label>Fim</label>
                                    <Input type="date" value={editFormData.end_date} onChange={e => setEditFormData({...editFormData, end_date: e.target.value})} />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Orçamento</label>
                                <Input type="number" value={editFormData.budget} onChange={e => setEditFormData({...editFormData, budget: e.target.value})} />
                            </div>

                            <Button text="Salvar Alterações" onClick={handleUpdateProject} />
                        </div>
                    </div>
                )}

                {isUpdateModalOpen && selectedGoal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h3>Atualizar: {selectedGoal.title}</h3>
                                <button className={styles.closeButton} onClick={() => setIsUpdateModalOpen(false)}><XIcon size={24}/></button>
                            </div>

                            {selectedGoal.type === 'QUANTITATIVE' ? (
                                <>
                                    <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '10px'}}>
                                        A meta é: <strong>{selectedGoal.target_value}</strong>. <br/>
                                        Valor atual registrado: <strong>{selectedGoal.latest_value || 0}</strong>.
                                    </p>
                                    <div className={styles.formGroup}>
                                        <label>Novo Valor Alcançado</label>
                                        <Input 
                                            type="number" 
                                            placeholder="Digite o novo valor total..." 
                                            value={progressData.value} 
                                            onChange={e => setProgressData({...progressData, value: e.target.value})} 
                                        />
                                    </div>
                                </>
                            ) : (
                                <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '10px'}}>
                                    Registre uma nova observação sobre o andamento desta meta.
                                </p>
                            )}

                            <div className={styles.formGroup}>
                                <label>Observação / Relatório</label>
                                <textarea 
                                    className={styles.textAreaInput}
                                    placeholder={selectedGoal.type === 'QUANTITATIVE' ? "Algum comentário sobre este número? (Opcional)" : "Descreva o progresso qualitativo..."}
                                    value={progressData.comment} 
                                    onChange={e => setProgressData({...progressData, comment: e.target.value})} 
                                    style={{minHeight: '80px', resize: 'vertical'}}
                                />
                            </div>

                            <Button text="Salvar Atualização" onClick={handleSubmitProgress} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
