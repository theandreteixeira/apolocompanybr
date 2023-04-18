import { Box, useColorMode, useRadio } from '@chakra-ui/react'
import { useState } from 'react'

const RadioCard = props => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()
  const { colorMode } = useColorMode()
  const isDisabled = props.item.quantity == 0

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        onClick={!isDisabled ? props.onClick : null}
        bgColor={isDisabled ? '#f5f5f5' : null}
        {...checkbox}
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        borderWidth='1px'
        borderRadius='md'
        _checked={
          isDisabled
            ? null
            : {
                border: `2px solid ${colorMode === 'light' ? 'black' : 'white'}`
              }
        }
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

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
