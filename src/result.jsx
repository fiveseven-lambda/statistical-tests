import * as React from 'react';
import { KaTeX } from './katex';

export const Result = ({ result }) => <div className='part result'>
  <h2>Result</h2>
  <h3><KaTeX text='t'/>-test</h3>
  <p>statistic: {result.t.statistic}</p>
</div>
