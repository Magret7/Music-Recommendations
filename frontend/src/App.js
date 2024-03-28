import logo from './logo.svg';
import './App.css';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div className="container-fluid p-3">
          <div className="row">
            <Sidebar />
            <div className="col-11">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
