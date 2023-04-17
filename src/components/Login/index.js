import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const logoUrl =
  'https://res.cloudinary.com/dqmmxqwiq/image/upload/v1679851948/Tasty%20Kitchen%20React%20mini%20Project/Frame_274_cgiuza.png'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowPassword: false,
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  showAndHidePassword = () => {
    this.setState(pre => ({isShowPassword: !pre.isShowPassword}))
  }

  successLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failedLogin = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const apiLoginUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiLoginUrl, options)

    const data = await response.json()

    if (response.ok === true) {
      this.successLogin(data.jwt_token)
    } else {
      this.failedLogin(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showErrorMsg, errorMsg} = this.state

    return (
      <div className="login-route-main-bg-container">
        <img
          src="https://res.cloudinary.com/dqmmxqwiq/image/upload/v1679850742/Tasty%20Kitchen%20React%20mini%20Project/Rectangle_1456_ymkaxu.png"
          alt="website login"
          className="login-route-landing-image"
        />
        <div className="login-content-container-for-large-center">
          <div className="login-route-login-container-complete">
            <div className="login-route-login-logo-text-container">
              <img
                src={logoUrl}
                className="login-route-large-logo"
                alt="website logo"
              />
              <h1 className="login-route-large-logo-text">Tasty Kitchens</h1>
            </div>

            <h1 className="login-route-login-heading">Login</h1>
            <form
              className="login-route-form-container"
              onSubmit={this.onSubmitForm}
            >
              <label htmlFor="userName" className="login-route-label-element">
                USERNAME
              </label>
              <input
                type="text"
                id="userName"
                className="login-route-input-element"
                onChange={this.onChangeUsername}
                value={username}
                placeholder="rahul"
              />
              <label htmlFor="password" className="login-route-label-element">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="login-route-input-element"
                onChange={this.onChangePassword}
                value={password}
                placeholder="rahul@2021"
              />

              {showErrorMsg ? (
                <p className="login-route-error-msg">*{errorMsg}</p>
              ) : null}
              <button className="login-route-form-submit-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
