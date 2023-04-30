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
import { IoMenuOutline } from 'react-icons/io5'
import {
  DrawerCategory,
  DrawerCategoryWithSubCategory
} from './CategoryAndIcon'
import { print } from '../../utils/print'

export const SideDrawer = ({ handlePath }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useSelector(state => state.authReducer.user.firstName)

  const handleSelectSection = path => {
    print('fria', path)

    onClose()
    handlePath(path)
  }

  return (
    <>
      <Icon w={'28px'} h={'28px'} onClick={onOpen} as={IoMenuOutline} />
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
              <DrawerCategoryWithSubCategory
                handlePath={handleSelectSection}
                name={'men'}
                text={'Masculino'}
                link={'/men'}
                subCategories={[
                  {
                    text: 'Ver tudo',
                    link: '/men',
                    handlePath: handleSelectSection
                  },
                  {
                    text: 'Futebol',
                    link: '/men',
                    handlePath: handleSelectSection,
                    category: 'football'
                  },
                  {
                    text: 'Academia',
                    link: '/men',
                    handlePath: handleSelectSection,
                    category: 'academia'
                  },
                  {
                    text: 'Casual',
                    link: '/men',
                    handlePath: handleSelectSection,
                    category: 'casual'
                  }
                ]}
              />
              <DrawerCategoryWithSubCategory
                handlePath={handleSelectSection}
                name={'women'}
                text={'Feminino'}
                link={'/women'}
                subCategories={[
                  {
                    text: 'Ver tudo',
                    link: '/women',
                    handlePath: handleSelectSection,
                    category: 'allProducts'
                  },
                  {
                    text: 'Futebol',
                    link: '/women',
                    handlePath: handleSelectSection,
                    category: 'futebol'
                  },
                  {
                    text: 'Academia',
                    link: '/women',
                    handlePath: handleSelectSection,
                    category: 'academia'
                  }
                ]}
              />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
