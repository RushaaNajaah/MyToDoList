import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
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
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/categories');
                setCategories(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/tasks', task);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <header className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-indigo-600 tracking-tight italic">Nouvelle tâche</h2>
                <button onClick={() => navigate(-1)} className="text-indigo-600 font-bold">Annuler</button>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Titre</label>
                    <input 
                        type="text"
                        className="w-full text-xl font-semibold border-b border-gray-100 py-2 outline-none focus:border-indigo-500"
                        value={task.title}
                        onChange={e => setTask({...task, title: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Échéance</label>
                    <input 
                        type="date" 
                        className="w-full p-4 bg-gray-50 rounded-2xl mt-2 outline-none"
                        value={task.due_date}
                        onChange={e => setTask({...task, due_date: e.target.value})}
                    />
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Catégorie</label>
                    <select 
                        className="w-full p-4 bg-gray-50 rounded-2xl mt-2 outline-none appearance-none"
                        value={task.category_id}
                        onChange={e => setTask({...task, category_id: e.target.value})}
                    >
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Notes</label>
                    <textarea 
                        className="w-full p-4 bg-gray-50 rounded-2xl mt-2 min-h-[100px] outline-none"
                        value={task.description}
                        onChange={e => setTask({...task, description: e.target.value})}
                    />
                </div>

                <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg">
                    Ajouter la tâche
                </button>
            </form>
        </div>
    );
};

export default AddTask;