// Show a single page
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import _ from 'lodash'

import StepsField from './StepsField'
// import steps from '../data/steps'

class StepsPage extends Component
{
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderFields() {
    const { page } = this.props
    const fields = _.map(page.fields, (field, index) => {
      return (
        <Field 
          _type={field.type}
          key={index}
          items={field.items || []} 
          name={field.name} 
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
    return (
      <div className={`page_${pageNumber}`}>
        {this.renderPage(page)}
      </div>
      )
  }
}

function mapStateToProps({ form }) {
  return { form: form }
}

export default reduxForm({
  form: 'dossier',
  destroyOnUnmount: false
})(connect(mapStateToProps)(StepsPage))