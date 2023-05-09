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
  Image,
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
import { apoloLight } from '../../constants/images'
import { CSSTransition, Transition } from 'react-transition-group'
import { useRef } from 'react'

export const SideDrawer = ({ handlePath }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSelectSection = path => {
    print('fria', path)

    onClose()
    handlePath(path)
  }

  const defaultStyle = {
    transition: `opacity 500ms ease-in-out`,
    opacity: 0
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  }
  const nodeRef = useRef(null)

  return (
    <>
      <Icon
        w={'28px'}
        h={'28px'}
        onClick={onOpen}
        as={IoMenuOutline}
        color={'white'}
      />
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size={'full'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {' '}
            <Image width={'60px'} src={apoloLight} />
          </DrawerHeader>
          <Divider />
          <DrawerBody display='flex' justifyContent='flex-start'>
            <VStack mt={'40px'} align={'start'}>
              <DrawerCategory
                handlePath={handleSelectSection}
                name={'/'}
                text={'Início'}
                link={'/'}
              />
              <DrawerCategory
                handlePath={handleSelectSection}
                name={'allProducts'}
                text={'Unisex'}
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
