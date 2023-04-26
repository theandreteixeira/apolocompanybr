import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { setItem } from '../utils/localstorage'
import { setItemSession } from '../utils/sessionStorage'

export const Private = ({ children, path }) => {
  const token = useSelector(state => state.authReducer.token)

  console.log('path:', path)
  setItemSession('previousPath', path)

  return !token ? <Navigate to={'/auth'} /> : children
}
