import {
  Button,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast
} from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi'
import { FaRegHeart } from 'react-icons/fa'
import { BsCart2, BsFillCaretDownFill } from 'react-icons/bs'
import { RiLuggageCartLine, RiCoupon3Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { logoutFromAccount } from '../../redux/features/auth/actions'
import { useNavigate } from 'react-router-dom'
import { Coupon } from '../../pages/coupon/Coupon'
import { print } from '../../utils/print'

export const Logout = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const navigate = useNavigate()
  print('state.authReducer')
  print(useSelector(state => state.authReducer))
  const user = useSelector(state => state.authReducer.user.firstName)

  const handleLogoutBtn = () => {
    dispatch(logoutFromAccount(toast, navigate))
  }

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          size='sm'
          bg={'transparent'}
          rightIcon={<BsFillCaretDownFill />}
        >
          {user}
        </MenuButton>
        <MenuList zIndex={2}>
          <Flex flexDirection={'column'} gap={'5px'} fontSize={'17px'}>
            {/* <MenuItem onClick={() => { navigate('/favourite') }} icon={<FaRegHeart />} >
                            Wishlist
                        </MenuItem> */}
            <MenuItem
              onClick={() => {
                navigate('/orders')
              }}
              icon={<RiLuggageCartLine />}
            >
              Pedidos
            </MenuItem>

            <MenuItem
              onClick={() => {
                navigate('/cart')
              }}
              icon={<BsCart2 />}
            >
              Sacola
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleLogoutBtn}
              icon={<FiLogOut />}
              color={'red'}
            >
              Sair
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </>
  )
}
