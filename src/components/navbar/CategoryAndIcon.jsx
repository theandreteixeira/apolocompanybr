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
  FormLabel,
  Stack
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
          handlePath({
            gender: name
          })
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
      <Link
        onClick={p => {
          handlePath({})
        }}
        to={link}
        name={name}
      >
        {text}
      </Link>
    </Text>
  )
}
export const DrawerCategoryWithSubCategory = ({
  text,
  subCategories,
  name
}) => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Text fontSize={'20px'} fontWeight={500}>
        <Link onClick={onToggle}>{text}</Link>
      </Text>
      <Collapse in={isOpen} animateOpacity>
        {subCategories.map(sub => {
          return DrawerSubCategory({ ...sub, gender: name })
        })}
      </Collapse>
    </>
  )
}
export const DrawerSubCategory = ({
  text,
  link,
  handlePath,
  category,
  gender
}) => {
  return (
    <Text fontSize={'16px'} mb={'10px'}>
      <Link
        onClick={p => {
          handlePath({
            category,
            gender
          })
        }}
        to={link}
        name={category}
      >
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
    if (value.length > 1) {
      navigate('/allProducts', {
        state: {
          search: value
        }
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} ml={'10px'}>
          <FormControl>
            <InputGroup variant={'filled'}>
              <InputLeftElement
                pointerEvents='none'
                children={<Icon as={FaSearch} color='gray' />}
              />
              <Input
                type='text'
                variant={'filled'}
                placeholder='Pesquisar'
                onChange={handleChange}
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </form>
    </>
  )
}
