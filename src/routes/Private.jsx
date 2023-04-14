import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const Private = ({ children }) => {
  const token = useSelector(state => state.authReducer.token)

  console.log('tem token? ' + token)

  return !token ? <Navigate to={'/auth'} /> : children
}
