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
  useDisclosure,
  FormControl,
  FormLabel
} from '@chakra-ui/react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

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
export const DrawerCategoryWithSubCategory = ({ text, subCategories }) => {
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
  const navigate = useNavigate()

  const handleChange = event => {
    console.log(event)
    setValue(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    navigate('/allProducts', {
      state: {
        search: value
      }
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<Icon as={FaSearch} color='gray.300' />}
            />
            <Input
              type='text'
              placeholder='Pesquisar'
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>
      </form>
    </>
  )
}
