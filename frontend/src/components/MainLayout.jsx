import { Outlet, Link, useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900">
      
      <header className="flex items-center justify-between px-10 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/LOGO.JPG" 
            alt="Logo" 
            className="w-10 h-10 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform border border-gray-50" 
          />
          <span className="text-2xl font-black text-indigo-600 tracking-tighter">
            MyToDoList
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/add-task')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors"
          >
            + Nouvelle tâche
          </button>
        </div>
        
      </header>

      <div className="flex flex-1">
        
        <aside className="w-64 border-r border-gray-100 p-6 flex flex-col gap-8 bg-white">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Navigation</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium py-1 px-2 rounded hover:bg-gray-50 transition-all">
                📅 Toutes les tâches
              </Link>
              <Link to="/menu" className="text-gray-700 hover:text-indigo-600 font-medium py-1 px-2 rounded hover:bg-gray-50 transition-all">
                🏠 Menu Principal
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Catégories</h3>
            <nav className="flex flex-col gap-2">
              <button className="text-left text-gray-600 hover:text-indigo-600 py-1 px-2 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Travail
              </button>
              <button className="text-left text-gray-600 hover:text-indigo-600 py-1 px-2 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Personnel
              </button>
              
              <Link to="/categories" className="mt-4 flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline">
                ⚙️ Gérer les catégories
              </Link>
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-10 bg-white">
          <Outlet />
        </main>
      </div>

      <footer className="py-8 border-t border-gray-100 text-center text-gray-500 text-sm bg-white">
        © 2026 MyToDoList - Tous droits réservés
      </footer>
    </div>
  );
};

export default MainLayout;