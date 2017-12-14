// Show a single page
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import _ from 'lodash'

import StepsField from './StepsField'

let FIELDS = []

class StepsPage extends Component
{
  constructor(props) {
    super(props)
    this.state = {}
    // Si depends_on
    // Effacer dans les réponses toutes les valeurs 
    // de ce numero etape qui ne sont pas du meme group
  }

  renderFields() {
    const { page } = this.props
    const fields = _.map(page.fields, (field, index) => {
      return (
        <Field 
          _type={field.type}
          key={index}
          items={field.items || []} 
          name={field._name || field.name} 
          label={field.label} 
          sources={field.sources || []}
          component={StepsField}
        />
      )
    })
    return (
      <div>
       {fields}
      </div>
    )
  }

  renderPage(page) {
    if (!page) return <p>End of form</p>
    return (
      <div>
        { this.renderFields() }
      </div>
    )
  }

  render() {
    const { page, pageNumber, form } = this.props
    FIELDS = this.props.page.fields
    return (
      <div className={`page_${pageNumber}`}>
      <form onSubmit={this.props.handleSubmit}>
        {this.renderPage(page)}
        <button type="submit">should validate</button>
      </form>
      </div>
      )
  }
}

function validate(values) {
  console.log("validate", values)
  const err = {}
  _.each(FIELDS, ({ _name, rules: { required, mustBe }, errors }) => {
    console.log('mustBe', mustBe)
    console.log('values name', values[_name])
    // Required validation
    if (required && !values[_name]) err[_name] = errors.required || 'Champ obigatoire'
    // mustBe validation
    if (mustBe && values[_name] !== mustBe) err[_name] = errors.mustBe || 'Ce choix est impossible'
  })
  console.log('Errors found:', err)
  return err
}

function mapStateToProps({ form }) {
  return { form: form }
}

export default reduxForm({
  validate,
  form: 'dossier',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(connect(mapStateToProps)(StepsPage))