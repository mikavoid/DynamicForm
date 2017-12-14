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
    this.printButtons = this.printButtons.bind(this)
  }

  printButtons(pageNumber, lastPage) {
    const { dossier } = this.props.form
    const hasError = false
    // const hasError = dossier && dossier.anyTouched && dossier.syncErrors.filter(())
    const backButton = pageNumber ? <button disabled={hasError} className="left red white-text btn flat-btn" onClick={this.props.previousPage}>Retour</button> : ''
    const submitButton = lastPage ? <button disabled={hasError} type="submit" className="right white-text btn flat-btn">Soumettre</button> : <button type="submit" disabled={hasError} className="right white-text btn flat-btn" onClick={this.nextPage}>Suivant</button>
    return (
      <div style={{marginTop: '20px'}}>
         {submitButton}
         {backButton}
      </div>
    )
  }

  renderFields() {
    const { page } = this.props
    const fields = _.map(page.fields, (field, index) => {
      return (
        <Field 
          _type={field.type}
          key={index}
          items={field.items || []} 
          dynLabel={field.dyn_label}
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
    const { page, pageNumber, form, lastPage } = this.props
    FIELDS = this.props.page.fields
    return (
      <div className={`page_${pageNumber}`}>
      <form onSubmit={this.props.handleSubmit}>
        {this.renderPage(page)}
        {this.printButtons(pageNumber, lastPage)}
      </form>
      </div>
      )
  }
}

function validate(values) {
  const err = {}
  _.each(FIELDS, ({ _name, rules: { required, mustBe, dyn }, errors = {}}) => {
    const value = values[_name] ? values[_name].trim() : false
    // Required validation
    if (required && !value) err[_name] = errors.required || 'Champ obigatoire'
    // mustBe validation
    if (mustBe && value !== mustBe) err[_name] = errors.mustBe || 'Ce choix est impossible'
    // dyn validation
     // mustBe validation
     if (dyn && value && value.split(dyn.sep).length != dyn.count) err[_name] = errors.dyn || 'Ce choix est impossible'
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