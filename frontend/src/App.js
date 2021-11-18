import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Notes from './components/Notes';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex justify-content-between">
        <div style={{ width: '20%', position: 'fixed' }}>
          <Sidebar />
        </div>
        <div style={{ width: '80%', marginLeft: '20%', backgroundColor: '#010409' }}>
          <Routes>
            <Route exact path="workspace/:workspaceName/notes" element={<Notes />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
