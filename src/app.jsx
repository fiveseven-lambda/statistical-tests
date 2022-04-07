import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './style.css';

import { Body } from './body';

const Header = () => <header className='part header'>
  <h1>
    Statistical Tests
  </h1>
</header>

const Footer = () => <footer className='footer'>
  Footer
</footer>

ReactDOMClient
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <Header/>
      <Body/>
      <Footer/>
    </React.StrictMode>,
  );
