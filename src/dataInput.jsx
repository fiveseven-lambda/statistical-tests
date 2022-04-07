import * as React from 'react';

export const DataInput = ({ wide, input: [input, setInput] }) => <div className='part data-input'>
  <h2>Data Input</h2>
  <SampleSize input={[input, setInput]}/>
  <Clear input={[input, setInput]}/>
  <CSV input={[input, setInput]}/>
  <Data wide={wide} input={[input, setInput]}/>
</div>

const SampleSize = ({ input: [input, setInput] }) => {
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

const CSV = ({ input: [input, setInput] }) => {
  const [file, setFile] = React.useState(null);
  const [format, setFormat] = React.useState([false, false]);
  React.useEffect(() => {
    if(!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      console.log(event.target.result);
    };
    reader.readAsText(file);
  });
  return <details>
    <summary>import csv</summary>
    <div>
      file: <input
        type='file'
        onChange={ event => {
          if(event.target.files.length > 0) setFile(event.target.files[0])
        } }
      />
    </div>
    <div>
      <SelectCSVFormat
        format={[format, setFormat]}
        value={[false, false]}
        label='data only'
        sample={'sample\nsample'}
      />
      <SelectCSVFormat
        format={[format, setFormat]}
        value={[true, false]}
        label='with header row'
        sample={'sample\nsample'}
      />
      <SelectCSVFormat
        format={[format, setFormat]}
        value={[false, true]}
        label='with index column'
        sample={'sample\nsample'}
      />
      <SelectCSVFormat
        format={[format, setFormat]}
        value={[false, false]}
        label='with header row and index column'
        sample={'sample\nsample'}
      />
    </div>
  </details>
}

const SelectCSVFormat = ({
  format: [format, setFormat],
  value,
  label,
  sample,
}) => <div>
  <input
    type='radio'
    name='csv-format'
    checked={ format.every((x, i) => x === value[i]) }
    onChange={ _ => setFormat(value) }
  />
  <label>{label}</label>
  <div className='csv-sample'>
    <p>sample: </p>
    <pre>{sample}</pre>
  </div>
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
