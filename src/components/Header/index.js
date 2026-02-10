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
      <ul>
        <li>
          <Link to="/">
            <img
              alt="website logo"
              onClick={onHome}
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </Link>
        </li>
      </ul>

      <ul className="header-list">
        <li>
          {' '}
          <Link className="lin-item" to="/">
            home
          </Link>
        </li>

        <li>
          {' '}
          <Link className="lin-item" to="/jobs">
            Jobs
          </Link>
        </li>
      </ul>

      <div>
        <button className="logout-button" onClick={onLogout}>
          logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
