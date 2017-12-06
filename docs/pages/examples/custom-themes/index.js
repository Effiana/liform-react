import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer, Field } from 'redux-form'
import { Provider } from 'react-redux'
import Liform, { DefaultTheme } from '../../../../src/'


const RenderInput = field => {
    return (
        <div>
            <label style={{ color: field.labelColor }}>{field.label}</label>
            <input {...field.input} type="text"/>
            {field.meta.touched && field.meta.error && <span>{field.meta.error}</span>}
            {field.description && <span>{field.description}</span>}
        </div>
    )
}

const MyStringWidget = (props) => {
    return (
        <Field
            component={RenderInput}
            label={props.label}
            name={props.fieldName}
            required={props.required}
            id={'field-'+props.fieldName}
            placeholder={props.schema.default}
            description={props.schema.description}
            labelColor={props.schema.labelColor}
            type={props.type}
        />
    )
}

const Demo = () => {
    const reducer = combineReducers({ form: formReducer })
    const store = createStore(reducer)
    const myTheme = { ...DefaultTheme, string: MyStringWidget }
    const schema = {
        'type':'object',
        'properties': {
            'title': { 'type':'string', 'title': 'Title', 'labelColor' : '#aa0000' },
            'type': { 'enum':[ 'One','Two' ], 'type':'string', 'title': 'Select a type' },
            'color': { 'type':'string', 'widget': 'color', 'title': 'In which color' },
            'checkbox': { 'type':'boolean', 'title': 'I agree with your terms' }
        }
    }
    return (
        <Provider store={store}>
            <Liform schema={schema} theme={myTheme} onSubmit={(v) => {console.log(v)}}/>
        </Provider>
    )
}

ReactDOM.render(
    <Demo/>,
    document.getElementById('placeholder')
)

