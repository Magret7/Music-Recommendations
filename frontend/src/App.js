import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);


function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div class="container-fluid p-3">
          <div class="row">
            <Sidebar />
            <div class="col-11">
              <RouterProvider router={router} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
