import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', color: '#4f46e5' });
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(true);

    const presetColors = [
        { name: 'Indigo', value: '#4f46e5' },
        { name: 'Rouge', value: '#dc2626' },
        { name: 'Vert', value: '#16a34a' },
        { name: 'Bleu', value: '#2563eb' },
        { name: 'Orange', value: '#ea580c' },
        { name: 'Rose', value: '#db2777' },
        { name: 'Gris', value: '#4b5563' }
    ];

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/categories');
            setCategories(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (error) {
            console.error("Erreur chargement catégories", error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/categories', newCategory);
            setShowToast(true);
            setNewCategory({ name: '', color: '#4f46e5' });
            fetchCategories();
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error("Erreur création catégorie", error);
        }
    };

    const deleteCategory = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`);
                setCategories(categories.filter(cat => cat.id !== id));
            } catch (error) {
                console.error("Erreur suppression", error);
                alert("Erreur lors de la suppression.");
            }
        }
    };

    if (loading) return <div className="p-10 text-gray-400 font-sans">Chargement des catégories...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 font-sans relative bg-white min-h-screen">
           
            {showToast && (
                <div className="fixed top-10 right-10 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-bounce border border-white/10">
                    <div className="flex items-center gap-3">
                        <span className="font-bold">✨ Catégorie créée !</span>
                    </div>
                </div>
            )}

            <div className="mb-10">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Configuration</h2>
                <p className="text-gray-500 mt-1">Gérez vos dossiers et étiquettes de tâches</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
               
                <div className="lg:col-span-1">
                    <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-[2rem] space-y-8 border border-gray-100">
                        <h3 className="font-bold text-gray-800 text-xl">Nouveau dossier</h3>
                        
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Nom du dossier</label>
                            <input 
                                type="text" 
                                required
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                                placeholder="Ex: Travail, Perso..."
                                className="w-full p-4 bg-white border-none rounded-2xl outline-none focus:ring-2 focus:ring-black/5 text-gray-700 shadow-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Couleur distinctive</label>
                          
                            <div className="flex flex-wrap gap-3">
                                {presetColors.map((color) => (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() => setNewCategory({...newCategory, color: color.value})}
                                        className={`w-7 h-7 rounded-full border-2 transition-all transform hover:scale-110 active:scale-95 ${
                                            newCategory.color === color.value 
                                            ? 'border-gray-900 scale-110 shadow-md' 
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                        style={{ backgroundColor: color.value }}
                                    />
                                ))}
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200"
                        >
                            Créer la catégorie
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-2">
                    <div className="p-2">
                        <h3 className="font-bold text-gray-800 text-xl mb-8">Catégories actives ({categories.length})</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {categories.map((cat) => (
                                <div key={cat.id} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: cat.color }}></div>
                                        <span className="font-bold text-gray-700">{cat.name}</span>
                                    </div>
                                    <button 
                                        onClick={() => deleteCategory(cat.id)}
                                        className="text-gray-300 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <button 
                onClick={() => navigate('/dashboard')}
                className="mt-16 flex items-center gap-3 text-gray-400 hover:text-black font-bold text-sm transition-all group"
            >
                <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                RETOUR AU TABLEAU DE BORD
            </button>
        </div>
    );
};

export default Categories;