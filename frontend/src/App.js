import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div class="container-fluid p-3">
          <div class="row">
            <Sidebar />
            <div class="col-11">
              <h1>Home</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
