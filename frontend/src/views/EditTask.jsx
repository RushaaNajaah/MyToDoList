import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [task, setTask] = useState({
        title: '',
        description: '',
        due_date: '',
        category_id: '',
        is_completed: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catsRes, taskRes] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/categories'),
                    axios.get(`http://127.0.0.1:8000/api/tasks/${id}`)
                ]);
                setCategories(catsRes.data || []);
                setTask(taskRes.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/tasks/${id}`, task);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Supprimer cette tâche ?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`);
                navigate('/dashboard');
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <header className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-green-600 italic">Modifier</h2>
                <button onClick={() => navigate(-1)} className="text-gray-400 font-bold">Annuler</button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Titre</label>
                    <input 
                        type="text"
                        className="w-full text-xl font-semibold border-b py-2 outline-none focus:border-green-500"
                        value={task.title || ''}
                        onChange={e => setTask({...task, title: e.target.value})}
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Échéance</label>
                    <input 
                        type="date" 
                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
                        value={task.due_date || ''}
                        onChange={e => setTask({...task, due_date: e.target.value})}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">Catégorie</label>
                    <select 
                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
                        value={task.category_id || ''}
                        onChange={e => setTask({...task, category_id: e.target.value})}
                    >
                        <option value="">Aucune catégorie</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="pt-4 space-y-3">
                    <button type="submit" className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg hover:bg-green-700 transition-colors">
                        Enregistrer
                    </button>
                    <button type="button" onClick={handleDelete} className="w-full py-4 text-red-500 font-bold hover:text-red-700">
                        Supprimer la tâche
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTask;