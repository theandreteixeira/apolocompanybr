import { Box, Flex, Input, Text } from '@chakra-ui/react'

export const CheckoutForm = ({ onChange }) => {
  return (
    <>
      <Box>
        <Text fontSize={'20px'} fontWeight={600} mb={'20px'}>
          Escolha um endereço para entrega:
        </Text>

        <Flex flexDirection={'column'} gap={'20px'}>
          <Input
            onChange={onChange}
            type={'text'}
            name={'addressLine1'}
            placeholder={'Endereço*'}
          />
          <Input
            onChange={onChange}
            type={'text'}
            name={'addressLine2'}
            placeholder={'Número'}
          />
          <Flex gap={'20px'}>
            <Input
              onChange={onChange}
              type={'text'}
              name={'locality'}
              placeholder={'Cidade*'}
            />
            <Input
              onChange={onChange}
              type={'text'}
              name={'pinCode'}
              placeholder={'CEP*'}
            />
          </Flex>
          <Flex gap={'20px'}>
            <Input
              onChange={onChange}
              type={'text'}
              name={'state'}
              placeholder={'Estado*'}
            />
            <Input
              onChange={onChange}
              type={'text'}
              name={'country'}
              placeholder={'País*'}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export const SelectAddress = ({
  onChange,
  addressLine1,
  pinCode,
  addressLine2,
  city,
  state,
  country
}) => {
  return (
    <>
      <Box border={'1px solid black'}>
        <Flex flexDirection={'column'}>
          <Text
            onChange={onChange}
            type={'text'}
            name={'addressLine1'}
            placeholder={'Endereço*'}
          >
            {addressLine1}
          </Text>
          <Text
            onChange={onChange}
            type={'text'}
            name={'addressLine2'}
            placeholder={'Número'}
          >
            {addressLine2}
          </Text>
          <Flex gap={'20px'}>
            <Text
              onChange={onChange}
              type={'text'}
              name={'locality'}
              placeholder={'Cidade*'}
            >
              {city}
            </Text>
            <Text
              onChange={onChange}
              type={'text'}
              name={'pinCode'}
              placeholder={'CEP*'}
            >
              {pinCode}
            </Text>
          </Flex>
          <Flex gap={'20px'}>
            <Text
              onChange={onChange}
              type={'text'}
              name={'state'}
              placeholder={'Estado*'}
            >
              {state}
            </Text>
            <Text
              onChange={onChange}
              type={'text'}
              name={'country'}
              placeholder={'País*'}
            >
              {country}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
