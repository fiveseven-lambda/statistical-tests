import * as React from 'react';
import { KaTeX } from './katex';

export const Result = ({ widthSwitch, result }) => <div className={`part ${widthSwitch} result`}>
  <h2>Result</h2>
  <h3><KaTeX text='t'/>-test</h3>
  <p>statistic: {result.t.statistic}</p>
</div>
