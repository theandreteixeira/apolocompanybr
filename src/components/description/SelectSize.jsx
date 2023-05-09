import { Box, Text, useColorMode } from '@chakra-ui/react'
import { useState } from 'react'
import { souldout } from '../../constants/images'
import { print } from '../../utils/print'

const BoxCard = (value, handleBoxClick, selected) => {
  const { colorMode } = useColorMode()
  const isDisabled = value.quantity <= 0
  print(value.name, value.quantity, selected, isDisabled)
  return (
    <label>
      <Box
        bg={isDisabled && '#f5f5f5'}
        backgroundImage={isDisabled && souldout}
        backgroundSize={isDisabled && 'auto 150px'}
        backgroundRepeat={isDisabled && 'repeat-x'}
        px={5}
        py={3}
        borderRadius='0'
        borderWidth='1px'
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        border={
          selected
            ? `1.5px solid ${colorMode === 'light' ? 'black' : 'white'}`
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
        <Text color={isDisabled && 'grey'}> {value.name}</Text>
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
