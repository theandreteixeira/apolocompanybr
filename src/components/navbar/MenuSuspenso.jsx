import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
  Icon
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Category } from './CategoryAndIcon'

const menuItems = [
  {
    title: 'Início',
    url: '/'
  },
  {
    title: 'Services',
    url: '/services',
    submenu: [
      {
        title: 'web design',
        url: 'web-design'
      },
      {
        title: 'web development',
        url: 'web-dev'
      },
      {
        title: 'SEO',
        url: 'seo'
      }
    ]
  },
  {
    title: 'About',
    url: '/about',
    submenu: [
      {
        title: 'Who we are',
        url: 'who-we-are'
      },
      {
        title: 'Our values',
        url: 'our-values'
      }
    ]
  }
]

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false)

  let ref = useRef()

  useEffect(() => {
    const handler = event => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [dropdown])

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true)
  }

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false)
  }

  const closeDropdown = () => {
    dropdown && setDropdown(false)
  }

  return (
    <li
      className='menu-items'
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.url && items.submenu ? (
        <>
          <Category
            text={items.title}
            link={''}
            handlePath={() => setDropdown(prev => !prev)}
            name={''}
          />
          {/* <button
            type='button'
            aria-haspopup='menu'
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown(prev => !prev)}
          >
            {window.innerWidth < 960 && depthLevel === 0 ? (
              items.title
            ) : (
              <Link to={items.url}>{items.title}</Link>
            )}
          </button> */}
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : !items.url && items.submenu ? (
        <>
          <Category
            text={items.title}
            link={''}
            handlePath={() => setDropdown(prev => !prev)}
            name={''}
          />
          {/* <button
            type='button'
            aria-haspopup='menu'
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown(prev => !prev)}
          >
          items.title
          </button> */}
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link to={items.url}>{items.title}</Link>
      )}
    </li>
  )
}

export const MenuSuspenso = () => {
  return (
    <nav>
      <ul className='menus'>
        {menuItems.map((menu, index) => {
          const depthLevel = 0
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />
        })}
      </ul>
    </nav>
  )
}

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1
  const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : ''
  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? 'show' : ''}`}>
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  )
}
