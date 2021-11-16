import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Notes from './components/Notes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="row">
          <div className="col-4 col-lg-2 bg-primary">
            <Sidebar />
          </div>
          <div className="col-8 col-lg-10 bg-warning">
            <Routes>
              <Route path="workspace/:workspaceName/notes" exact element={<Notes />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
