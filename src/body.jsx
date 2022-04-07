import * as React from 'react';
import { KaTeX } from './katex';

import { Main } from './main';

const Description = ({ wide }) => <div className={`part description ${wide}`}>
  <h2>Descriptions</h2>
  <p>The paired two-sample <KaTeX text='t'/>-test.
  For independent random variables <KaTeX text='X_1, \ldots, X_n'/> and <KaTeX text='Y_1, \ldots, Y_n'/>, ...</p>
</div>

export const Body = () => {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  const wide = windowWidth >= 800 ? 'wide' : 'narrow';
  return <div className={`body ${wide}`}>
    <Description wide={wide}/>
    <Main wide={wide}/>
  </div>;
}
