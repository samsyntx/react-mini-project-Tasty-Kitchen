/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import './index.css'

class CartItem extends Component {
  state = {quantity: 0, isShow: true}

  componentDidMount() {
    this.removeUnNecessaryData()
    this.getTheCartData()
  }

  removeUnNecessaryData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    if (cartData.length > 0) {
      const updateCartData = cartData.filter(eachItem => eachItem.quantity >= 1)
      localStorage.setItem('cartData', JSON.stringify(updateCartData))
    }
  }

  getTheCartData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {eachCartItem, updatingWholeCart} = this.props
    const updateData = cartData.filter(
      eachItem => eachItem.id === eachCartItem.id,
    )
    const newlyCart = updateData.pop()
    this.setState({quantity: newlyCart.quantity})
    updatingWholeCart()
  }

  incrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {eachCartItem} = this.props

    const updateCartDataAndState = cartData.map(eachItem => {
      if (eachItem.id === eachCartItem.id) {
        const quantity = eachItem.quantity + 1
        this.setState({quantity})
        return {...eachItem, quantity}
      }
      return {...eachItem}
    })
    localStorage.setItem('cartData', JSON.stringify(updateCartDataAndState))
    this.getTheCartData()
  }

  decrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {eachCartItem} = this.props
    const updateCartDataAndState = cartData.map(eachItem => {
      if (eachItem.id === eachCartItem.id) {
        const quantity = eachItem.quantity - 1
        this.setState({quantity})
        if (quantity >= 1) {
          return {...eachItem, quantity}
        }
        this.setState({isShow: false})
        return {...eachItem, quantity}
      }
      return {...eachItem}
    })

    localStorage.setItem('cartData', JSON.stringify(updateCartDataAndState))
    this.getTheCartData()
    this.removeUnNecessaryData()
  }

  renderCompleteList = () => {
    const {eachCartItem} = this.props
    const {quantity} = this.state

    return (
      <>
        <li>
          <div className="cart-list-item-main-container" testid="cartItem">
            <img
              className="cart-items-main-image"
              src={eachCartItem.imageUrl}
              alt="cart-item"
            />
            <div className="cart-item-main-content-container">
              <h1 className="cart-item-main-item-heading">
                {eachCartItem.name}
              </h1>
              <div className="cart-item-plus-minus-button-container">
                <button
                  className="cart-item-plus-minus-button"
                  testid="decrement-quantity"
                  type="button"
                  onClick={this.decrementCartItemQuantity}
                >
                  <HiOutlineMinusSm className="minus-icon" />
                </button>
                <p
                  testid="item-quantity"
                  className="cart-item-plus-minus-count-value"
                >
                  {quantity}
                </p>
                <button
                  className="cart-item-plus-minus-button"
                  testid="increment-quantity"
                  type="button"
                  onClick={this.incrementCartItemQuantity}
                >
                  <BsPlus className="plus-icon" />
                </button>
              </div>
              <div className="cart-item-value-rupee-container">
                <BiRupee />
                <p>{eachCartItem.cost}</p>
              </div>
            </div>
          </div>
        </li>
      </>
    )
  }

  render() {
    const {isShow} = this.state

    return <>{isShow && this.renderCompleteList()}</>
  }
}

export default CartItem
