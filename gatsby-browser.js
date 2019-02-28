import 'reset-css'
import 'animate.css'
import './src/styles/global.scss'

export const onRouteUpdate = ({ location }) => {
  console.log(location.pathname)
}
