import * as React from 'react';

const DataInput = props => (
  <div className='part data-input'>
    <h2>Data Input</h2>
  </div>
);

const Result = props => (
  <div className='part result'>
    <h2>Result</h2>
  </div>
);

export const Main = ({ wide }) => (
  <div className={`main ${wide}`}>
    <DataInput/>
    <Result/>
  </div>
);
