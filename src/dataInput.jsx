import * as React from 'react';

export const DataInput = ({ wide, input: [input, setInput] }) => <div className='part data-input'>
  <h2>Data Input</h2>
  <SampleSize input={[input, setInput]}/>
  <Clear input={[input, setInput]}/>
  <CSV wide={wide} input={[input, setInput]}/>
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
  return <div className='input-part'>
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

const Clear = ({input: [input, setInput]}) => <div className='input-part'>
  <button
    onClick={ _ => setInput({
      ...input,
      label: ['', ''],
      data: input.data.map(_ => ['', '']),
    }) }
  > clear all cells </button>
</div>

const CSV = ({ wide, input: [input, setInput] }) => {
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
  return <details className={`csv-input ${wide}`}>
    <summary>import csv</summary>
    <div className='csv-details'>
      <div className='input-part'>
        file: <input
          type='file'
          onChange={ event => {
            if(event.target.files.length > 0) setFile(event.target.files[0])
          } }
        />
      </div>
      <table>
        <tbody>
          <SelectCSVFormat
            format={[format, setFormat]}
            value={[false, false]}
            label='data only'
            sample={'10,20\n30,40\n50,60\n ︙'}
          />
          <SelectCSVFormat
            format={[format, setFormat]}
            value={[true, false]}
            label='with header row'
            sample={'data 0,data 1\n10,20\n30,40\n50,60\n ︙'}
          />
          <SelectCSVFormat
            format={[format, setFormat]}
            value={[false, true]}
            label='with index column'
            sample={'1,10,20\n2,30,40\n3,50,60\n ︙'}
          />
          <SelectCSVFormat
            format={[format, setFormat]}
            value={[true, true]}
            label='with header row and index column'
            sample={',data 0,data 1\n1,10,20\n2,30,40\n3,50,60\n ︙'}
          />
        </tbody>
      </table>
    </div>
  </details>
}

const SelectCSVFormat = ({
  format: [format, setFormat],
  value,
  label,
  sample,
}) => <tr>
  <td>
    <pre className='csv-sample'>{sample}</pre>
  </td>
  <td>
    <input
      type='radio'
      name='csv-format'
      checked={ format.every((x, i) => x === value[i]) }
      onChange={ _ => setFormat(value) }
    />
    <label>{label}</label>
  </td>
</tr>

const Data = ({wide, input: [input, setInput]}) => {
  const [focused, setFocused] = React.useState(null);
  return <div className={`input-part data ${wide}`}>
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
