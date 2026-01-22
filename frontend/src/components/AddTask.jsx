import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/categories').then(res => setCategories(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/tasks', {
                title: title,
                description: description,
                category_id: categoryId || null,
                completed: false
            });
            navigate('/dashboard');
        } catch (error) {
            console.error("Erreur serveur :", error.response?.data);
            alert("Erreur lors de l'ajout. Vérifie la console.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <input 
                    type="text" placeholder="Titre" value={title}
                    onChange={(e) => setTitle(e.target.value)} required
                    className="w-full p-4 border-b border-gray-100 outline-none text-xl"
                />
                <select 
                    value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none appearance-none"
                >
                    <option value="">Sélectionner une catégorie...</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => navigate('/dashboard')} className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold">Annuler</button>
                    <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold">Ajouter une tâche</button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;