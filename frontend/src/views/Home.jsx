import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-800">    
            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-2xl bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
                        Bienvenue sur <span className="text-indigo-600">MyToDoList</span> !
                    </h1>
                    
                    <div className="text-left space-y-4 mb-10">
                        <p className="text-xl font-medium text-gray-600">MyToDoList peut vous aider à :</p>
                        <ul className="space-y-3 text-lg text-gray-500">
                            <li className="flex items-center">
                                <span className="mr-2 text-indigo-500">•</span> 
                                Organiser et prioriser vos tâches quotidiennes
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2 text-indigo-500">•</span> 
                                Vous concentrer sur l'essentiel
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2 text-indigo-500">•</span> 
                                Atteindre vos objectifs et finaliser vos projets
                            </li>
                        </ul>
                    </div>

                    
                    <Link 
                        to="/Menu" 
                        className="inline-block px-10 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all uppercase tracking-wider"
                    >
                        C'est parti
                    </Link>
                </div>
            </main>

            
            
        </div>
    );
};

export default Home;