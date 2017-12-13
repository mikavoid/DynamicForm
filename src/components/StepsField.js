// Contains the logic to print a single field
// - input
// - select
// - radio
// - checkboxes
// - files
import React, { Component } from 'react'
import * as data from '../data/data'

class StepsField extends Component
{
  
  constructor(props) {
    super(props)
    this.state ={filtered: [], ...data}
    this.getInput = this.getInput.bind(this)
  }

  renderRadios(items = [], input) {
    return items.map((option, index) => {
      const value = option.value || option.name || ''
      return (
        <p className="item" key={index}>
          <input type="radio"
            id={`${input.name}_${index}`}
            name={`${input.name}`}
            value={value}
            checked={value === input.value}
            onChange={(event) => {
              if (event.target.checked) return input.onChange(value)
            }}
          />
          <label htmlFor={`${input.name}_${index}`}>{value}</label>
      </p>
      )
    })
  }

  renderItems(items = [], input) {
    return items.map((option, index) => {
      return (
        <p className="item" key={index}>
          <input type="checkbox"
              id={index}
              name={`${input.name}[${index}]`}
              value={option.value}
              checked={input.value.indexOf(option.value) !== -1}
              onChange={(event) => {
                const newValue = [...input.value];
                if (event.target.checked) {
                  newValue.push(option.value);
                } else {
                  newValue.splice(newValue.indexOf(option.value), 1);
                }
                return input.onChange(newValue, ...input.value);
              }}
            />
            <label htmlFor={index}>{option.value}</label>
          </p>
      )
    })
  }

  renderOptions(options = [], input) {
    return options.map((option, index) => {
      return (
          <option
            key={index}
            value={option.value}
          >{option.label || option.value}
          </option>
      )
    })
  }

  getInput() {
    const { input, label, sources, meta, _type, items } = this.props
    switch (_type) {
      case 'file':
      case 'text' :
      return (
        <div className="input-field validate">
          <input id={input.name} type={_type} {...input}/>
          <label htmlFor={input.name}>{label}</label>
        </div>
      )
      break
      case 'checkbox' :
      const element = (
        <p>
          <input id={input.name} type="checkbox" {...input}/>
          <label htmlFor={input.name}>{label}</label>
        </p>
      )
      return this.buildRow(label, element)
      break
      case 'checkboxes' :
      return this.buildRow(label, this.renderItems(items, input))
      break
      case 'radio' :
      return this.buildRow(label, this.renderRadios(items, input))
      break
      case 'select' :
      return this.buildRow(label, <select {...input} className="browser-default">{this.renderOptions(items, input)}</select>)
      case 'textarea' :
      return this.buildRow(label, <textarea {...input} className="materialize-textarea"></textarea>)
      break
      case 'text_dynamic':
      if (!sources.data) break
      // Qand on change le champ de selection (par exemple code postal)
      const _onChange = (event) => {
        let value = event.target.value
        const filtered = this.state[sources.data].filter((c) => c.cp.indexOf(value) === 0)
        return this.setState({filtered}, () => input.onChange(value))
      }

      // Quand on selectionne le resultat de la recherche json par exemple le select ville
      const _onDynChange = (event) => input.onChange(`${input.value} ${event.target.value}`)

      // Génerer le champ synamique (par exemple le select ville)
      const _renderDynElem = () => {
        const items = this.state.filtered ? this.state.filtered.map((c) => <option selected={input.value.indexOf(c.name) !== -1} key={c.name} value={c.name}>{c.name}</option>) : []
        return (
          <div>
          <select name="x" className="browser-default" onChange={_onDynChange}>
            <option value="">Sélectionnez votre ville</option>
            {items}
          </select>
          </div>
        )
      }

      // Le render final
      return (
        <div className="input-field validate">
          <input type='text' id={input.name + '_dyn'} name={input.name + '_dyn'} value={input.value.split(' ')[0] || ''} onChange={_onChange}/>
          <input type='hidden' id={input.name} name={input.name} {...input}/>
          <label htmlFor={input.name}>{label}</label>
          {_renderDynElem()}
        </div>
      )
      default: return (
        // Separator
        <div>
          <h4>{label}</h4>
        </div>
      )
    }
  }

  buildRow(label, elem) {
    return (
      <div className="flex-row">
        <h5>{label}</h5>
        <div>
          {elem}
        </div>
      </div>
    )
  }

  renderTheField() {
    return (
      <div>
        <div className="input-bloc">
          {this.getInput()}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderTheField()}
      </div>
    )
  }
}

export default StepsField
