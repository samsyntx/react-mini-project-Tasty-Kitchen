import {Component} from 'react'
import {Link} from 'react-router-dom'

class HeaderMenuItems extends Component {
  clickToChange = () => {
    const {eachMenuDetail, callToChangeActiveMenu} = this.props
    callToChangeActiveMenu(eachMenuDetail.id)
  }

  render() {
    const {eachMenuDetail, isActive} = this.props
    const {link, text} = eachMenuDetail
    const activeIdStyle = isActive ? 'active-header-css' : ''

    return (
      <Link to={link}>
        <li>
          <button
            className={`header-list-item-text ${activeIdStyle}`}
            type="button"
            onClick={this.clickToChange}
          >
            {text}
          </button>
        </li>
      </Link>
    )
  }
}

export default HeaderMenuItems
