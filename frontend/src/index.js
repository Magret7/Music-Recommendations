import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './assets/css/style.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import Home from './components/Home'
import Artists from './components/Artists'
import DisplayArtist from './components/DisplayArtist';
import Albums from './components/Albums'
import DisplayAlbum from './components/DisplayAlbum';
import Genres from './components/Genres';
import DisplayGenre from './components/DisplayGenre';
import About from './components/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // TODO: Figure out how "children" URLs work
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "artists",
        element: <Artists />,
      },
      {
        path: "artist/:artistName",  // TODO: convert to use artist ID
        element: <DisplayArtist />
      },
      {
        path: "albums",
        element: <Albums />
      },
      {
        path: "album/:albumName",  // TODO: convert to use album ID
        element: <DisplayAlbum />
      },
      {
        path: "genres",
        element: <Genres />
      },
      {
        path: "genre/:genreName",
        element: <DisplayGenre />
      },
      {
        path: "about",
        element: <About />
      },

    ],
  },
  // {
  //   path: "/artists",
  //   element: <Artists />
  // },


]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
