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
import {
  DrawerCategory,
  DrawerCategoryWithSubCategory
} from './CategoryAndIcon'
import { useState } from 'react'

export const SideDrawer = ({ handlePath }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const [isOpen, setIsOpen] = useState(false)
  const user = useSelector(state => state.authReducer.user.firstName)
  console.log(useSelector(state => state.authReducer))

  const handleSelectSection = path => {
    onClose()
    handlePath(path)
  }

  // const onToggle = isOpen => {
  //   setIsOpen(isOpen)
  // }

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
            <VStack gap={'30px'} mt={'40px'}>
              <DrawerCategory
                handlePath={handleSelectSection}
                name={'/'}
                text={'Início'}
                link={'/'}
              />
              <DrawerCategory
                handlePath={handleSelectSection}
                name={'allProducts'}
                text={'Todos os Produtos'}
                link={'/allProducts'}
              />
              {/* <DrawerCategory
                handlePath={handleSelectSection}
                name={'men'}
                text={'Masculino'}
                link={'/men'}
              /> */}
              <DrawerCategoryWithSubCategory
                handlePath={handleSelectSection}
                name={'men'}
                text={'Masculino'}
                link={'/men'}
                subCategories={[
                  {
                    text: 'Ver tudo',
                    link: 'link',
                    handlePath: handleSelectSection,
                    name: 'futebol'
                  },
                  {
                    text: 'Futebol',
                    link: 'link',
                    handlePath: handleSelectSection,
                    name: 'futebol'
                  },
                  {
                    text: 'Academia',
                    link: 'link',
                    handlePath: handleSelectSection,
                    name: 'futebol'
                  },
                  {
                    text: 'Casual',
                    link: 'link',
                    handlePath: handleSelectSection,
                    name: 'futebol'
                  }
                ]}
              />
              <DrawerCategory
                handlePath={handleSelectSection}
                name={'women'}
                text={'Feminino'}
                link={'women'}
              />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
