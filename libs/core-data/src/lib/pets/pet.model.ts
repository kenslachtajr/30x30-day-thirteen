export interface Pet {
  id: number,
  type: string,
  description: string
}

export const emptyPet: Pet = {
  id: null,
  type: '',
  description: ''
}
