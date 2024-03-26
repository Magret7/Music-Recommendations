import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home'
import Artists from './components/Artists'
import Albums from './components/Albums'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    // TODO: Figure out how "children" URLs work
    path: "/artists",
    element: <Artists />
  },
  {
    path: "/albums",
    element: <Albums />
  }
]);


function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div className="container-fluid p-3">
          <div className="row">
            <Sidebar />
            <div className="col-11">
              <RouterProvider router={router} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
