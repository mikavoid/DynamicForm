export const page_0 = [
  {
    type: 'text',
    label: 'Catégorie',
    name: '0_categorie',
    rules: {required: true}
  },
  {
    // Separator
    label: 'Un titre'
  },
  {
    type: 'textarea',
    label: 'Textarea',
    name: '0_textarea',
    rules: {required: true}
  },
  {
    type: 'radio',
    label: 'Des radios',
    name: '0_radios',
    items: [
      {value: 'Oui'},
      {value: 'Non'}
    ],
    rules: {required: true}
  },
  {
    type: 'checkboxes',
    label: 'Des checkboxes',
    name: '0_checkboxes',
    items: [
      {value: 'Une réponse possible'},
      {value: 'Une autre'}
    ],
    rules: {required: true}
  },
  {
    type: 'select',
    label: 'Des selects',
    name: '0_selects',
    items: [
      {value: 'Une réponse possible'},
      {value: 'Une autre', selected: true}
    ],
    rules: {required: true}
  },
  {
    type: 'checkbox',
    label: 'Une checkbox',
    name: '0_checkbox',
    rules: {required: true}
  }
]

export const page_1 = [
  {
    type: 'text',
    label: 'Nom',
    name: '1_nom',
    rules: {required: true, mustbe: 'coucou'}
  }
]
