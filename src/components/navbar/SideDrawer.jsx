import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { BiMenu } from 'react-icons/bi'
import { DrawerCategory } from './CategoryAndIcon'

export const SideDrawer = ({ handlePath }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useSelector(state => state.authReducer.user.firstName)
  console.log(useSelector(state => state.authReducer))

  return (
    <>
      <Icon w={'28px'} h={'28px'} mr={'10px'} onClick={onOpen} as={BiMenu} />
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Olá {user}</DrawerHeader>
          <Divider />
          <DrawerBody>
            <VStack gap={'30px'} mt={'40px'} onClick={onClose}>
              <DrawerCategory
                handlePath={handlePath}
                name={'/'}
                text={'Home'}
                link={'/'}
              />
              <DrawerCategory
                handlePath={handlePath}
                name={'allProducts'}
                text={'Todos os Produtos'}
                link={'/allProducts'}
              />
              <DrawerCategory
                handlePath={handlePath}
                name={'men'}
                text={'Masculino'}
                link={'/men'}
              />
              <DrawerCategory
                handlePath={handlePath}
                name={'women'}
                text={'Feminino'}
                link={'women'}
              />
              <DrawerCategory
                handlePath={handlePath}
                name={'kids'}
                text={'Infantil'}
                link={'/kids'}
              />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
