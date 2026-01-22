import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './views/Home';
import HomeMenu from './views/Menu'; 
import AddTask from './views/AddTask';
import Dashboard from './views/Dashboard';
import Categories from './views/Categories';
import EditTask from './views/EditTask'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<HomeMenu />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
          <Route path="/search" element={<div>Page de recherche en cours...</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;