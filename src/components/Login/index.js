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
      <div className="BgContainer">
        <img
          src="https://res.cloudinary.com/dqmmxqwiq/image/upload/v1679850742/Tasty%20Kitchen%20React%20mini%20Project/Rectangle_1456_ymkaxu.png"
          alt="website login"
          className="LargeImage"
        />
        <div className="LoginContainer">
          <img src={logoUrl} className="Logo" alt="website logo" />
          <h1 className="LargeHeading">Tasty Kitchens</h1>
          <img
            className="Rectangle"
            src="https://res.cloudinary.com/dqmmxqwiq/image/upload/v1679846331/Tasty%20Kitchen%20React%20mini%20Project/Rectangle_1457_mjvqdx.png"
            alt="website login"
          />

          <h1 className="LoginHeading">Login</h1>
          <form className="FormContainer" onSubmit={this.onSubmitForm}>
            <label htmlFor="userName" className="LabelElement">
              USERNAME
            </label>
            <input
              type="text"
              id="userName"
              className="InputElement"
              onChange={this.onChangeUsername}
              value={username}
              placeholder="USER NAME"
            />
            <label htmlFor="password" className="LabelElement">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="InputElement"
              onChange={this.onChangePassword}
              value={password}
              placeholder="PASSWORD"
            />

            {showErrorMsg ? <p className="ErrorMsg">*{errorMsg}</p> : null}
            <button className="LoginButton" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
