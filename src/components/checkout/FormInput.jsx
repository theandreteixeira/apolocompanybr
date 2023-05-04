import { Input } from '@chakra-ui/react'

export const FormInput = ({ name, onChange, placeholder }) => {
  return (
    <Input
      borderRadius={0}
      height={'50px'}
      onChange={onChange}
      type={'text'}
      border={'1px solid black'}
      name={name}
      placeholder={placeholder}
      mb={'10px'}
    />
  )
}
