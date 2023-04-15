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
  useDisclosure
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'

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
      <Link onClick={handlePath} to={link} name={name}>
        {text}
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

//Search box, will add it later
export const SearchBox = () => {
  return (
    <>
      {/* <Box
                borderRadius={50}
                w={'180px'}
                color={'#ced2d6'}
                bg={'#f5f5f5'}
                textAlign={'left'}
                p={'7px'}
                _hover={{ bg: '#ececec', color: 'black' }}
                cursor={'text'}
            > */}
      {/* <Center justifyContent={'left'} > */}
      <InputGroup my={'20px'} w={'210px'}>
        <Input
          placeholder={'Pesquisar...'}
          borderRadius={50}
          borderStyle={'none'}
          variant={'filled'}
          textAlign={'left'}
          onSubmit={async val => {
            const response = await axios.get('/obterProdutos', {
              params: {
                search: val
              }
            })
            console.log(response)
          }}
        />
        <InputLeftElement
          pointerEvents='none'
          children={<Icon as={AiOutlineSearch} />}
        />
      </InputGroup>
      {/* <NavIcon iconName={AiOutlineSearch} />
                    <Text fontSize={'17px'}>Search</Text> */}
      {/* </Center> */}
      {/* </Box> */}
    </>
  )
}
