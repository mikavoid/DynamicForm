export const page_0 = [
  {
    type: 'select',
    label: 'Catégorie de votre projet',
    name: 'categorie',
    items: [
      {value: '', label: 'Selectionner votre catégorie'},
      {value: 'Culture'},
      {value: 'Sport'}
    ],
    rules: {required: true},
    errors: {
      required: 'Merci de bien vouloir sélectionner une catégorie'
    }
  }
]

export const page_1 = [
  {
    type: 'text',
    label: 'Vous remplissez une demande de dotation par le fonds Alès Mécénat. Quel est le nom de la structure ?',
    name: 'nom_structure',
    rules: {required: true},
    errors: {
      required: 'Merci de bien vouloir renseigner le nom de votre structure.'
    }
  },
  {
    type: 'radio',
    label: 'Vous structure est-t-elle reconnue d\'intêret général ?',
    name: 'interet_general',
    items: [
      {value: 'Oui'},
      {value: 'Non'}
    ],
    rules: {required: true, mustBe: 'Oui'},
    errors: {
      required: 'Merci de bien vouloir sélectionner une réponse',
      mustBe: 'Vous ne pouvez pas poursuivre votre demande si votre structure n\'est pas reconnue d\'interet général'
    }
  }
]

export const page_2 = [
  {
    type: 'text_dynamic',
    label: 'Code postal de votre commune*',
    name: 'code_postal',
    rules: {required: true},
    errors: {
      required: 'Merci de bien vouloir sélectionner votre code postal'
    },
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