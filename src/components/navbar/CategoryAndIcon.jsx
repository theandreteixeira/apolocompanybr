import {
  Center,
  Icon,
  Text,
  useColorMode,
  Box,
  Input,
  InputGroup,
  Collapse,
  InputLeftElement,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { Form, Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'
import { useState } from 'react'

export const Category = ({ text, link, handlePath, name }) => {
  const { colorMode } = useColorMode()
  return (
    <Center
      h={'60px'}
      cursor={'pointer'}
      paddingX={'15px'}
      _hover={{
        borderBottom: `2px solid ${colorMode === 'light' ? 'black' : 'white'}`
      }}
    >
      <Link
        onClick={p => {
          handlePath(name)
        }}
        to={link}
        name={name}
      >
        <Text fontWeight={'bold'}>{text}</Text>
      </Link>
    </Center>
  )
}

export const DrawerCategory = ({ text, link, handlePath, name }) => {
  return (
    <Text fontSize={'20px'} fontWeight={500}>
      <Link onClick={handlePath} to={link} name={name}>
        {text}
      </Link>
    </Text>
  )
}
export const DrawerCategoryWithSubCategory = ({
  text,
  link,
  handlePath,
  name,
  subCategories
}) => {
  const { isOpen, onOpen, onToggle } = useDisclosure()
  return (
    <>
      <Text fontSize={'20px'} fontWeight={500}>
        <Link onClick={onToggle}>{text}</Link>
      </Text>
      <Collapse in={isOpen} animateOpacity>
        {subCategories.map(sub => {
          return DrawerSubCategory(sub)
        })}
      </Collapse>
    </>
  )
}
export const DrawerSubCategory = ({ text, link, handlePath, name }) => {
  return (
    <Text fontSize={'16px'} mb={'10px'}>
      <Link onClick={handlePath} to={link} name={name}>
        {text}
      </Link>
    </Text>
  )
}

export const NavIcon = ({ iconName }) => {
  return <Icon as={iconName} w={'28px'} h={'28px'} />
}

export const SearchBox = () => {
  const [value, setValue] = useState('')

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    console.log(event)
    const response = await axios.get('/obterProdutos', {
      params: {
        search: event.target.value
      }
    })
    console.log(response)
  }

  return (
    <>
      <InputGroup my={'20px'} w={'210px'}>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder={'Pesquisar...'}
            borderRadius={50}
            borderStyle={'none'}
            variant={'filled'}
            value={value}
            onChange={handleChange}
            textAlign={'left'}
          />
        </form>
        <InputLeftElement
          pointerEvents='none'
          children={<Icon as={AiOutlineSearch} />}
        />
      </InputGroup>
    </>
  )
}
