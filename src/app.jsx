import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './style.css';

import { Body } from './body';

const App = () => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  const widthSwitch = windowWidth >= 900 ? 'wide' : 'narrow';
  return <div>
    <Header widthSwitch={widthSwitch}/>
    <Body widthSwitch={widthSwitch}/>
    <Footer widthSwitch={widthSwitch}/>
  </div>
}

const Header = ({ widthSwitch }) => <header className={`part header ${widthSwitch}`}>
  <h1>
    Statistical Tests
  </h1>
</header>

const Footer = ({ widthSwitch }) => <footer className={`footer ${widthSwitch}`}>
  <p>
    Footer
  </p>
</footer>

ReactDOMClient
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
  );
