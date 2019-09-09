import React from 'react';
import './App.css';
import { Form, Field } from 'react-final-form';
import { NumericTextBox, Switch } from '@progress/kendo-react-inputs'
import { Input, InputLabel, Select, MenuItem } from '@material-ui/core';
import { DatePicker } from '@progress/kendo-react-dateinputs'
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Button } from '@progress/kendo-react-buttons';
import '@progress/kendo-theme-default/dist/all.css';

const userData = require('json-loader!./userData.json');

console.log(userData);

const onSubmit = values => {
  window.alert(JSON.stringify(values, 0, 2))
}

const materialHOC = (type, {input, meta, label, ...rest}) => {
    const Type = type;
    const LabelElement = type !== SelectComponent ? 'label' : 'span';
    if (type === NumericTextBox && input.value === '') {
        input.value = null;
    }
    return <LabelElement className="k-form-field">
        <span>{label}</span>
        <Type
            className="form-item"
            {...input}
            {...rest}
        />
        {meta.error && meta.touched && <span className="k-required">{meta.error}</span>}
    </LabelElement>;
};

const SelectComponent = () => {
  return (
    <Select
      value={10}
      inputProps={{
        name: 'age',
        id: 'age-simple',
      }}
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  )
}

const MaterialInput = (options) => (materialHOC(Input, options));
const MaterialSelect = (options) => (materialHOC(Select, options))

function App() {
  return (
    <div className="App">
      <Form
        onSubmit={onSubmit}
        initialValues={{ stooge: 'larry', employed: false }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-child">
              <InputLabel>Прізвище</InputLabel>
              <Field
                name="lastName"
                component={MaterialInput}
                type="text"
              />
            </div>
            <div className="form-child">
              <InputLabel>Ім'я</InputLabel>
              <Field
                name="firstName"
                component={MaterialInput}
                type="text"
              />
            </div>
            <div className="form-child">
              <InputLabel>По-батькові</InputLabel>
              <Field
                name="middleName"
                component={MaterialInput}
                type="text"
              />
            </div>
            <div className="form-child">
              <InputLabel>Стать</InputLabel>
              <Field
                name="sex"
                component={MaterialSelect}
                type="text"
              >
                <MenuItem />
                <MenuItem value="#ff0000">❤️ Red</MenuItem>
                <MenuItem value="#00ff00">💚 Green</MenuItem>
                <MenuItem value="#0000ff">💙 Blue</MenuItem>
              </Field>
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}

export default App;
