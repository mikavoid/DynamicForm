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

  // printButtons() {
  //   const backButton = this.state.currentPageNumber ? <button className="left red white-text btn flat-btn" onClick={this.previousPage}>Retocur</button> : ''
  //   const submitButton = !steps[this.state.currentPageNumber + 1] ? <button type="submit" className="right white-text btn flat-btn">Soumettcre</button> : <button type="submit" className="right white-text btn flat-btn" onClick={this.nextPage}>Suivacnt</button>
  //   return (
  //     <div style={{marginTop: '20px'}}>
  //        {submitButton}
  //        {backButton}
  //     </div>
  //   )
  // }

  nextPage() {
    return this.setState({currentPageNumber: this.state.currentPageNumber + 1})
  }

  previousPage(e) {
    e && e.preventDefault()
    if (this.state.currentPageNumber <= 0) return
    return this.setState({currentPageNumber: this.state.currentPageNumber - 1}, () => console.log('after', this.state.currentPageNumber))
  }

  render() {
    const lastPage = !steps[this.state.currentPageNumber + 1]
    return (
      <div>
          <StepsPage 
            lastPage={lastPage}
            page={this.getPageInfos()} 
            pageNumber={this.state.currentPageNumber}
            previousPage={this.previousPage}
            onSubmit={!lastPage ? this.nextPage : this.onSubmit} 
          />
          {/* {this.printButtons()} */}
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
