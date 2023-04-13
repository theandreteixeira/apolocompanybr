import { Box, Flex, FormControl, Input, Text } from '@chakra-ui/react'
import MaskedInput from 'react-text-mask'
import createAutoCorrectDataPipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import React, { useState } from 'react'

export const CheckoutForm = ({ onChange, isLoading }) => {
  const [cpf, setCpf] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const cpfMask = [
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/
  ]
  const phoneNumberMask = [
    '(',
    /\d/,
    /\d/,
    ')',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ]
  const cpfPipe = createAutoCorrectDataPipe('dd/mm/yyyy')
  const phoneNumberPipe = createNumberMask('(dd) ddddd-dddd')

  const handleChange = event => {
    const value = event.target.value.replace(/[^\d]/g, '')
    const maskedValue = cpfPipe(value) || ''
    onChange({ target: { name: 'cpf', value } })
    setCpf(maskedValue.value)
  }

  const handleChangePhoneNumber = event => {
    const value = event.target.value.replace(/[^\d]/g, '')
    const maskedValue = phoneNumberPipe(value) || ''
    onChange({ target: { name: 'phoneNumber', value } })
    setPhoneNumber(maskedValue.value)
  }

  return (
    <>
      <Box>
        <Text fontSize={'20px'} fontWeight={600} mb={'20px'}>
          Escolha um endereço para entrega:
        </Text>

        <Flex flexDirection={'column'} gap={'20px'}>
          <FormControl isDisabled={isLoading}>
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
                name={'city'}
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
            <Text fontSize={'20px'} fontWeight={600} mb={'20px'}>
              Preencha com os seus dados:
            </Text>
            <MaskedInput
              onChange={handleChange}
              name={'cpf'}
              mask={cpfMask}
              placeholder={'CPF*'}
              value={cpf}
            />
            <MaskedInput
              onChange={handleChangePhoneNumber}
              name={'phoneNumber'}
              mask={phoneNumberMask}
              placeholder={'Telefone*'}
              value={phoneNumber}
            />
          </FormControl>
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
              name={'city'}
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
