import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  border
} from '@chakra-ui/react'
import MaskedInput from 'react-text-mask'
import createAutoCorrectDataPipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import React, { useState } from 'react'
import { BrazilianStates } from '../../utils/BrazilianStates'

export const CheckoutForm = ({ onChange, isLoading }) => {
  const [cpf, setCpf] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [cep, setCEP] = useState('')
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
  const CEPMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
  const cpfPipe = createAutoCorrectDataPipe('dd/mm/yyyy')
  const phoneNumberPipe = createNumberMask('(dd) ddddd-dddd')
  const CEPPipe = createNumberMask('ddddd-ddd')

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

  const handleChangeCEP = event => {
    const value = event.target.value.replace(/[^\d]/g, '')
    const maskedValue = CEPPipe(value) || ''
    onChange({ target: { name: 'pinCode', value } })
    setCEP(maskedValue.value)
  }

  return (
    <>
      <Box width={'100%'}>
        <Text fontSize={'20px'} fontWeight={600} mb={'10px'}>
          Escolha um endereço para entrega:
        </Text>

        <Flex flexDirection={'column'} gap={'20px'}>
          <FormControl isDisabled={isLoading}>
            <Input
              onChange={onChange}
              type={'text'}
              name={'addressLine1'}
              placeholder={'Endereço'}
              mb={'10px'}
            />
            <Input
              onChange={onChange}
              type={'text'}
              name={'addressLine2'}
              placeholder={'Número'}
              mb={'10px'}
            />
            <Flex gap={'10px'}>
              <Input
                onChange={onChange}
                type={'text'}
                name={'city'}
                placeholder={'Cidade'}
                mb={'10px'}
              />
              <MaskedInput
                onChange={handleChangeCEP}
                name={'CEP'}
                mask={CEPMask}
                placeholder={'CEP'}
                value={cep}
                style={{
                  padding: '10px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'grey',
                  borderRadius: '10px',
                  marginBottom: '10px'
                }}
              />
            </Flex>
            <Flex gap={'20px'}>
              <Select
                placeholder='Estado'
                name={'state'}
                onChange={onChange}
                mb={'10px'}
              >
                {BrazilianStates.map(state => {
                  return (
                    <option value={JSON.stringify(state)}>{state.name}</option>
                  )
                })}
              </Select>
            </Flex>
            <Text fontSize={'20px'} fontWeight={600} mb={'10px'} mt={'10px'}>
              Preencha com os seus dados:
            </Text>
            <Box my={4} w={'100%'}>
              <MaskedInput
                onChange={handleChange}
                name={'cpf'}
                mask={cpfMask}
                placeholder={'CPF'}
                value={cpf}
                width={'100%'}
                style={{
                  padding: '10px',
                  width: '100%',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'grey',
                  borderRadius: '10px'
                }}
              />
            </Box>
            <Box my={4} w={'100%'}>
              <MaskedInput
                onChange={handleChangePhoneNumber}
                name={'phoneNumber'}
                mask={phoneNumberMask}
                placeholder={'Telefone'}
                value={phoneNumber}
                style={{
                  padding: '10px',
                  width: '100%',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'grey',
                  borderRadius: '10px'
                }}
              />
            </Box>
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
            placeholder={'Endereço'}
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
              placeholder={'CEP'}
            >
              {pinCode}
            </Text>
          </Flex>
          <Flex gap={'20px'}>
            <Text
              onChange={onChange}
              type={'text'}
              name={'state'}
              placeholder={'Estado'}
            >
              {state}
            </Text>
            <Text
              onChange={onChange}
              type={'text'}
              name={'country'}
              placeholder={'País'}
            >
              {country}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
