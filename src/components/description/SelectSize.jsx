import { Box, useColorMode } from '@chakra-ui/react'
import { useState } from 'react'

const BoxCard = (value, handleBoxClick, selected) => {
  const { colorMode } = useColorMode()
  const isDisabled = value.quantity == 0
  console.log(value.name, value.quantity, selected, isDisabled)
  return (
    <label>
      <Box
        bg={isDisabled ? '#f5f5f5' : undefined}
        px={5}
        py={3}
        borderRadius='md'
        borderWidth='1px'
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        border={
          selected
            ? `2px solid ${colorMode === 'light' ? 'black' : 'white'}`
            : undefined
        }
        _checked={
          isDisabled
            ? null
            : {
                border: selected
                  ? `10px solid ${colorMode === 'light' ? 'red' : 'red'}`
                  : undefined
              }
        }
        onClick={isDisabled ? undefined : () => handleBoxClick(value.name)}
      >
        {value.name}
      </Box>
    </label>
  )
}

export const SelectSize = ({ sizes, setMySize }) => {
  const [selectedBox, setSelectedBox] = useState(null)

  const handleBoxClick = boxId => {
    setSelectedBox(boxId)
    setMySize(boxId)
  }

  return (
    <Box display='flex' gap={'5px'}>
      {sizes.map(value => {
        return BoxCard(value, handleBoxClick, selectedBox === value.name)
      })}
    </Box>
  )
}
