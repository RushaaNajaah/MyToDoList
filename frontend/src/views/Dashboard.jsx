import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('Toutes');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/tasks');
                setTasks(res.data || []);
            } catch (err) {
                console.error("Erreur API:", err);
            }
        };
        fetchTasks();
    }, []);

    const toggleComplete = async (task) => {
        const current = task.is_completed ?? task.completed ?? 0;
        const newStatus = (current == 1 || current === true) ? 0 : 1;
        try {
            setTasks(prev => prev.map(t => t.id === task.id ? {...t, is_completed: newStatus, completed: newStatus} : t));
            await axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}`, { is_completed: newStatus });
        } catch (error) { console.error(error); }
    };

    
    const filteredTasks = tasks.filter(t => {
        
        const matchesSearch = (t.title || "").toLowerCase().includes(searchTerm.toLowerCase());
        
        
        const val = t.is_completed ?? t.completed ?? 0;
        const isDone = (val == 1 || val === true);
        let matchesStatus = true;
        if (filter === 'Terminées') matchesStatus = isDone;
        if (filter === 'Actives') matchesStatus = !isDone;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="max-w-xl mx-auto p-4 space-y-6">
            <header>
                <h1 className="text-4xl font-extrabold text-gray-900">Rappels</h1>
                
                <p className="text-[10px] text-green-500 font-mono"> {filteredTasks.length} tâches affichées</p>
            </header>
            
            <input 
                type="text"
                placeholder="Recherchez une tâche ici..."
                className="w-full p-3 bg-gray-100 rounded-xl outline-none border-2 border-transparent focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="bg-gray-200 p-1 rounded-xl flex gap-1">
                {['Toutes', 'Actives', 'Terminées'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${filter === f ? 'bg-white text-green-600 shadow' : 'text-gray-500'}`}>
                        {f}
                    </button>
                ))}
            </div>

            <div className="space-y-2">
                {filteredTasks.map(task => (
                    <div key={task.id} className="p-4 bg-white border rounded-xl flex items-center gap-4 group">
                        <button onClick={() => toggleComplete(task)}
                            className={`w-6 h-6 rounded-full border-2 flex-shrink-0 ${(task.is_completed ?? task.completed) ? 'bg-green-600 border-green-600' : 'border-gray-200'}`}>
                            {(task.is_completed ?? task.completed) ? <span className="text-white text-xs">✓</span> : null}
                        </button>
                        
                        <div className="flex-1">
                            <h3 className={`font-medium ${(task.is_completed ?? task.completed) ? 'line-through text-gray-300' : 'text-gray-900'}`}>
                                {task.title}
                            </h3>
                            {task.due_date && <p className="text-xs text-green-600">{task.due_date}</p>}
                        </div>
                        
                        <button onClick={() => navigate(`/edit-task/${task.id}`)} className="text-xs font-bold text-green-600 opacity-0 group-hover:opacity-100">
                            MODIFIER
                        </button>
                    </div>
                ))}

                {filteredTasks.length === 0 && (
                    <p className="text-center py-10 text-gray-400">Aucun résultat pour "{searchTerm}"</p>
                )}

                <button onClick={() => navigate('/add-task')} className="w-full py-4 mt-4 border-2 border-dashed border-gray-200 rounded-xl text-green-600 font-bold hover:bg-green-50 transition-colors">
                    + Ajouter une tâche
                </button>
            </div>
        </div>
    );
};

export default Dashboard;