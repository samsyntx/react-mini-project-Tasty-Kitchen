/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import './index.css'

class CartItem extends Component {
  incrementCartItemQuantity = () => {
    const {eachCartItem, incrementQuantityWithId} = this.props
    const {id} = eachCartItem
    incrementQuantityWithId(id)
  }

  decrementCartItemQuantity = () => {
    const {eachCartItem, decrementQuantityWithId} = this.props
    const {id} = eachCartItem
    decrementQuantityWithId(id)
  }

  renderCompleteList = () => {
    const {eachCartItem} = this.props

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
                  {eachCartItem.quantity}
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
    return <>{this.renderCompleteList()}</>
  }
}

export default CartItem
