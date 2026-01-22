import { Link } from 'react-router-dom';

const HomeMenu = () => {
  return (
    <div className="flex flex-col gap-10 mt-12 ml-10">
      <Link to="/add-task" className="flex items-center gap-4 text-2xl text-gray-700 hover:text-indigo-600 group transition-all">
        <span className="text-3xl text-indigo-600 group-hover:scale-125 transition-transform font-bold">+</span>
        Ajouter une tâche
      </Link>

      <Link to="/dashboard" className="flex items-center gap-4 text-2xl text-gray-700 hover:text-indigo-600 group transition-all">
        <span className="text-3xl text-indigo-600 group-hover:scale-125 transition-transform font-bold">+</span>
        Voir mes tâches en attente
      </Link>
    </div>
  );
};

export default HomeMenu;