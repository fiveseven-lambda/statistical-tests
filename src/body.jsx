import * as React from 'react';
import { KaTeX } from './katex';

import { Main } from './main';

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

const Description = ({ wide }) => <div className={`part description ${wide}`}>
  <h2>Descriptions</h2>
  <p>
    This page implements paired difference tests (<a href='https://en.wikipedia.org/wiki/Paired_difference_test'>Wikipedia</a>).
  </p>
  <p>
    The paired two-sample <KaTeX text='t'/>-test (<a href='https://en.wikipedia.org/wiki/Student%27s_t-test#Paired_samples'>Wikipedia</a>).
  </p>
</div>
