export const handleCategory = (category) => {
  switch (category) {
    case 'football':
      return 'Futebol'
    case 'casual':
      return 'Casual'
    case 'training':
      return 'Treino'
    default:
      return 'Futebol'
  }
}