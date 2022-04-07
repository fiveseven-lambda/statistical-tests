import * as React from 'react';

const SampleSize = ({input: [input, setInput]}) => {
  const [focused, setFocused] = React.useState(false);
  const setSize = (s, data) => {
    const new_size = Number(s);
    if(Number.isSafeInteger(new_size) && new_size > 0){
      const old_size = data.length;
      data.length = new_size;
      for(let i = old_size; i < new_size; ++i) data[i] = ['', ''];
    }else{
      alert('invalid sample size');
    }
  };
  return <div>
    sample size: <input
      type='number'
      min='1'
      value={input.size}
      onFocus={ _ => setFocused(true) }
      onBlur={ event => {
        const data = input.data;
        setSize(event.target.value, data);
        setInput({ ...input, data });
        setFocused(false);
      } }
      onInput={ event => {
        const size = event.target.value;
        const data = input.data;
        if(!focused) setSize(size, data);
        setInput({ ...input, size, data });
      } }
    />
  </div>
}

const Clear = ({input: [input, setInput]}) => <div>
  <button
    onClick={ _ => setInput({
      ...input,
      label: ['', ''],
      data: input.data.map(_ => ['', '']),
    }) }
  > clear all cells </button>
</div>

const Data = ({wide, input: [input, setInput]}) => {
  const [focused, setFocused] = React.useState(null);
  return <div className={`data ${wide}`}>
    <table>
      <thead>
        <tr>
          <th></th>
          { input.label.map((cell, i) =>
            <th key={i}>
              <input
                type='text'
                value={cell}
                onChange={ event => {
                  const label = input.label;
                  label[i] = event.target.value;
                  setInput({ ...input, label });
                } }
              />
            </th>
          ) }
        </tr>
      </thead>
      <tbody>
        { input.data.map((row, i) =>
          <tr key={i}>
            <td> {i + 1} </td>
            { row.map((cell, j) =>
              <td key={j}>
                <input
                  type='text'
                  value={cell}
                  onFocus={ _ => setFocused([i, j]) }
                  onBlur={ _ => setFocused(null) }
                  onChange={ event => {
                    const data = input.data;
                    data[i][j] = event.target.value;
                    setInput({ ...input, data });
                  } }
                />
              </td>
            ) }
          </tr>
        ) }
      </tbody>
    </table>
  </div>
}

export const DataInput = ({wide, input: [input, setInput]}) => <div className='part data-input'>
  <h2>Data Input</h2>
  <SampleSize input={[input, setInput]}/>
  <Clear input={[input, setInput]}/>
  <Data wide={wide} input={[input, setInput]}/>
</div>