// Shows every pages
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import StepsPage from './StepsPage'
import steps, { getStep } from '../data/steps'

class Steps extends Component
{
  constructor(props) {
    super(props)
    this.state = {currentPageNumber: 0}
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  onSubmit(values) {
    console.log('trying to submit form', values)
  }

  getPageInfos() {
    if (!steps[this.state.currentPageNumber]) return null
    return getStep(this.state.currentPageNumber, this.props.form.dossier && this.props.form.dossier.values ? this.props.form.dossier.values : [] )
  }

  printButtons() {
    const backButton = this.state.currentPageNumber ? <button className="left red white-text btn flat-btn" onClick={this.previousPage}>Retour</button> : ''
    const submitButton = !steps[this.state.currentPageNumber + 1] ? <button type="submit" className="right white-text btn flat-btn">Soumettre</button> : <button type="submit" className="right white-text btn flat-btn" onClick={this.nextPage}>Suivant</button>
    return (
      <div style={{marginTop: '20px'}}>
         {submitButton}
         {backButton}
      </div>
    )
  }

  nextPage() {
    return this.setState({currentPageNumber: this.state.currentPageNumber + 1})
  }

  previousPage() {
    if (this.state.currentPageNumber <= 0) return
    return this.setState({currentPageNumber: this.state.currentPageNumber - 1})
  }

  render() {
    const lastPage = !steps[this.state.currentPageNumber + 1]
    return (
      <div>
          <StepsPage 
            page={this.getPageInfos()} 
            pageNumber={this.state.currentPageNumber}
            previousPage={this.previousPage}
            onSubmit={lastPage ? this.onSubmit : this.nextPage} 
          />
          {this.printButtons()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { form: state.form }
}

export default reduxForm({
  form: 'dossier',
  destroyOnUnmount: false
})(connect(mapStateToProps)(Steps))
