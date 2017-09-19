import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { Provider } from 'react-redux'
import Liform from 'liform-react'
import Markdown from './Markdown'

import { SubmissionError } from 'redux-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
    return sleep(1000).then(() => {
        // simulate server latency
        if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
            throw new SubmissionError({
                username: 'User does not exist',
                _error: 'Login failed!'
            })
        } else if (values.password !== 'redux-form') {
            throw new SubmissionError({
                password: 'Wrong password',
                _error: 'Login failed!'
            })
        } else {
            window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        }
    })
}

const Demo = () => {
    const reducer = combineReducers({ form: formReducer })
    const store = createStore(reducer)
    const schema = {
        'type':'object',
        'properties': {
            'username': { 'type':'string', 'title': 'Username' },
            'password': { 'type':'string', 'title': 'Password', 'widget': 'password' },
            'email': { 'type':'string', 'format': 'email', 'title': 'E-mail', 'widget': 'email' },
        }
    }


    return (
        <Provider store={store}>
            <Liform schema={schema} onSubmit={submit} />
        </Provider>
    )
}


const Validation = () => (
  <div>
    <h2>Validation</h2>
    <h3>Form</h3>
    <Demo/>
    <h3>Code</h3>
    <Markdown page={require('../Content/Validation.md')}/>
  </div>
)

export default Validation

export {submit}
