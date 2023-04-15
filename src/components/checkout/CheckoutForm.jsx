import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text
} from '@chakra-ui/react'
import MaskedInput from 'react-text-mask'
import createAutoCorrectDataPipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import React, { useState } from 'react'

export const CheckoutForm = ({ onChange, isLoading }) => {
  const states = [
    { name: 'Acre', value: 'AC' },
    { name: 'Alagoas', value: 'AL' },
    { name: 'Amapá', value: 'AP' },
    { name: 'Amazonas', value: 'AM' },
    { name: 'Bahia', value: 'BA' },
    { name: 'Ceará', value: 'CE' },
    { name: 'Distrito Federal', value: 'DF' },
    { name: 'Espírito Santo', value: 'ES' },
    { name: 'Goiás', value: 'GO' },
    { name: 'Maranhão', value: 'MA' },
    { name: 'Mato Grosso', value: 'MT' },
    { name: 'Mato Grosso do Sul', value: 'MS' },
    { name: 'Minas Gerais', value: 'MG' },
    { name: 'Pará', value: 'PA' },
    { name: 'Paraíba', value: 'PB' },
    { name: 'Paraná', value: 'PR' },
    { name: 'Pernambuco', value: 'PE' },
    { name: 'Piauí', value: 'PI' },
    { name: 'Rio de Janeiro', value: 'RJ' },
    { name: 'Rio Grande do Norte', value: 'RN' },
    { name: 'Rio Grande do Sul', value: 'RS' },
    { name: 'Rondônia', value: 'RO' },
    { name: 'Roraima', value: 'RR' },
    { name: 'Santa Catarina', value: 'SC' },
    { name: 'São Paulo', value: 'SP' },
    { name: 'Sergipe', value: 'SE' },
    { name: 'Tocantins', value: 'TO' },
  ];
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
      <Box>
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
            <Flex gap={'20px'}>
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
              />
            </Flex>
            <Flex gap={'20px'}>
              <Select placeholder='Estado' name={'state'} onChange={onChange} mb={'10px'}>
                {
                  states.map((state) => {
                    return (<option value={state.value}>{state.name}</option>)
                  })
                }
              </Select>
            </Flex>
            <Text fontSize={'20px'} fontWeight={600} mb={'10px'} mt={'10px'}>
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
