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
  Stack,
  SlideFade,
  Flex
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import React from 'react'

export const Category = ({ text, link, handlePath, name }) => {
  return (
    <Center
      h={'60px'}
      cursor={'pointer'}
      paddingX={'15px'}
      _hover={{
        borderBottom: `2px solid white`
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
        <Text
          fontWeight={'bold'}
          color={'white'}
          textTransform={'uppercase'}
          fontSize={'16px'}
        >
          {text}
        </Text>
      </Link>
    </Center>
  )
}

export const DrawerCategory = ({ text, link, handlePath, name }) => {
  return (
    <Link
      onClick={p => {
        handlePath({})
      }}
      to={link}
      name={name}
    >
      <Flex alignItems='center'>
        <Text fontSize={'34px'} fontWeight={900} textTransform={'uppercase'}>
          {text}
        </Text>
        <Icon as={IoIosArrowForward} boxSize={8} />
      </Flex>
    </Link>
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
      <Link onClick={onToggle}>
        <Flex alignItems='center'>
          <Text fontSize={'34px'} fontWeight={900} textTransform={'uppercase'}>
            {text}
          </Text>
          {isOpen ? (
            <Icon as={IoIosArrowDown} boxSize={8} />
          ) : (
            <Icon as={IoIosArrowForward} boxSize={8} />
          )}
        </Flex>
        {isOpen && <Box w={'25px'} h={'6px'} bg={'#C8FF0B'} />}
      </Link>
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
  return <Icon as={iconName} w={'25px'} h={'25px'} color={'white'} />
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
        <Stack spacing={4}>
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
