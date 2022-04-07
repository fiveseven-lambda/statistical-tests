import * as React from 'react';

import { DataInput  } from './dataInput';

const Result = props => <div className='part result'>
  <h2>Result</h2>
</div>

export const Main = ({ wide }) => {
  const [input, setInput] = React.useState({
    size: '3',
    label: ['Enter data label', 'Enter data label'],
    data: [['', ''], ['', ''], ['', '']]
  });
  return <div className={`main ${wide}`}>
    <DataInput
      wide={wide}
      input={[input, setInput]}
    />
    <Result/>
  </div>
}
