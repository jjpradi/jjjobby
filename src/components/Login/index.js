import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onPassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  successView = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props

    history.replace('/')
  }

  failureView = errorMsg => {
    this.setState({
      errorMsg,
    })
  }

  onLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state

    console.log(username, password)

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',

      body: JSON.stringify(userDetails),
    }

    console.log(options)

    const response = await fetch(url, options)

    console.log(response)

    const data = await response.json()
    if (response.ok === true) {
      this.successView(data.jwt_token)
    } else {
      this.failureView(data.error_msg)
    }
    console.log(data)
  }

  render() {
    const {username, password, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    console.log(jwtToken)

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg">
        <form className="form" onSubmit={this.onLogin}>
          <img
            className="img"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <div className="">
            <label htmlFor="name">USERNAME</label>

            <input
              id="name"
              onChange={this.onName}
              type="text"
              value={username}
            />
          </div>

          <div className="">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              onChange={this.onPassword}
              value={password}
              type="password"
            />
          </div>

          <button className="button" type="submit">
            Login
          </button>

          {errorMsg && <p>didnt match</p>}
        </form>
      </div>
    )
  }
}

export default Login
