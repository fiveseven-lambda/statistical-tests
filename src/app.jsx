import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './app.css';

import { Body } from './body';

const Header = () => <header className='part header'>
  <h1>
    Statistical Tests
  </h1>
</header>

const Footer = () => <footer className='footer'>
  Footer
</footer>

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <Body/>
    <Footer/>
  </React.StrictMode>,
);
