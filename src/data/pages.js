export const page_0 = [
  {
    type: 'select',
    label: 'Catégorie de votre projet',
    name: '0_categorie',
    items: [
      {value: '', label: 'Selectionner votre catégorie'},
      {value: 'Culture'},
      {value: 'Sport'}
    ],
    rules: {required: true}
  }
]

export const page_1 = [
  {
    type: 'text',
    label: 'Vous remplissez une demande de dotation par le fonds Alès Mécénat. Quel est le nom de la structure ?',
    name: '1_nom_structure',
    rules: {required: true}
  },
  {
    type: 'radio',
    label: 'Vous structure est-t-elle reconnue d\'intêret général ?',
    name: '1_interet_general',
    items: [
      {value: 'Oui'},
      {value: 'Non'}
    ],
    rules: {required: true, mustbe: 'Oui'}
  }
]

export const page_2 = [
  {
    type: 'text_dynamic',
    label: 'Code postal de votre commune*',
    name: '2_code_postal',
    rules: {required: true},
    sources: {
      data: 'cities',
      output: 'select' // En fonction du code postal, on va rechercher dans le fichier cities, la ville correspondant et on ajoute un select avec ces villes
    }
  }
]

export const page_3_culture = [
  {
    type: 'text',
    label: 'Culture',
    name: 'culture',
    rules: {required: true}
  }
]

export const page_3_sport= [
  {
    type: 'text',
    label: 'Sport',
    name: 'sport',
    rules: {required: true}
  }
]