import * as pageFields from './pages'
import { values } from 'redux-form';

const getPageFields = (pageNum, depends_on = null, values) => {
  let pageName = 'page_' + pageNum
  if (depends_on) {
    if (!values[depends_on]) throw new Error('no depends on')
    pageName += '_' + values[depends_on].toLowerCase()
  }
  return pageFields[pageName]
}

export const getStep = (num, values) => {
  const step = steps[num]
  const depends_on = steps[num].depends_on
  step.fields =  getPageFields(num, depends_on, values || [])

  // Buil the _name : (num)_(depends_on)_(name)
  steps.fields = step.fields.map((field, i) => {
    const newObject = field
    const depends_group = values[depends_on] || ''
    newObject['_name'] = `${num}_${depends_group ? depends_group.trim() + '_': ''}${field.name}`.toLowerCase()
    return newObject
  })

  return step
}

const steps = [
  // Page 0
  {
    title: 'Page 0',
    message: 'Test Page 0'
  },
  // Page 1
  {
    title: 'Page 1',
    message: 'Test Page 1'
  },
  // Page 2
  {
    title: 'Page 2',
    message: 'Test Page 2'
  },
  // Page 3
  {
    title: 'Page 3',
    message: 'Test Page 3',
    depends_on: '0_categorie'
  }
]

export default steps