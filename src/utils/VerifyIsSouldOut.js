export const verifyIsSouldOut = sizes => {
  var isSold = true
  console.log(sizes)
  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i].quantity > 0) {
      isSold = false
      break
    }
  }
  return isSold
}