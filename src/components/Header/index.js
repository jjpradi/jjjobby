import {Link, Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props

    history.replace('/login')

    Cookies.remove('jwt_token')
  }
  const onHome = () => {
    const {history} = props

    history.replace('/')
  }
  return (
    <nav className="navbar">
      <img
        onClick={onHome}
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      />

      <div>
        <Link to="/">Home</Link>

        <Link to="/jobs">Jobs</Link>
      </div>

      <div>
        <button className="" onClick={onLogout}>
          {' '}
          logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
