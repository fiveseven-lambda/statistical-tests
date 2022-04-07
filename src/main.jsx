import * as React from 'react';

import { DataInput  } from './dataInput';
import { Result } from './result';

export const Main = ({ wide }) => {
  const [input, setInput] = React.useState({
    size: '3',
    label: ['Enter data label', 'Enter data label'],
    data: [['', ''], ['', ''], ['', '']]
  });
  const result = {};
  const diff = input.data.map(row => row[0] - row[1]);
  const mean = diff.reduce((sum, x) => sum + x, 0) / diff.length;
  const variance = Math.sqrt(diff.reduce((sqsum, x) => sqsum + (x - mean) * (x - mean), 0) / (diff.length - 1));
  result.t = {
    statistic: mean / (variance / Math.sqrt(diff.length))
  };
  return <div className={`main ${wide}`}>
    <DataInput
      wide={wide}
      input={[input, setInput]}
    />
    <Result
      result={result}
    />
  </div>
}
