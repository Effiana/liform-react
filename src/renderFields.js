import _ from 'lodash'
import renderField from './renderField'

export const isRequired = (schema, fieldName) => {
    if (!schema.required) {
        return false
    }
    return (schema.required.indexOf(fieldName) != 1)
}

const renderFields =
    (schema, theme, prefix = null) =>
    {
        return _.map(schema.properties, (field, name) =>  renderField(field, name, theme, prefix, isRequired(schema, name)))
    }

export default renderFields
