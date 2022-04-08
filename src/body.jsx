import * as React from 'react';
import { KaTeX } from './katex';

import { Main } from './main';

export const Body = ({ widthSwitch }) => {
  return <div className={`body ${widthSwitch}`}>
    <Description widthSwitch={widthSwitch}/>
    <Main widthSwitch={widthSwitch}/>
  </div>;
}

const Description = ({ widthSwitch }) => <div className={`part description ${widthSwitch}`}>
  <h2>Descriptions</h2>
  <p>
    This page implements paired difference tests (<a href='https://en.wikipedia.org/wiki/Paired_difference_test'>Wikipedia</a>).
  </p>
  <p>
    The paired two-sample <KaTeX text='t'/>-test (<a href='https://en.wikipedia.org/wiki/Student%27s_t-test#Paired_samples'>Wikipedia</a>).
  </p>
</div>
