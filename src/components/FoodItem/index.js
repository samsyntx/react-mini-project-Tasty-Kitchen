/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'

import './index.css'

class FoodItem extends Component {
  state = {quantity: 1, isFound: false}

  componentDidMount() {
    this.removeParticularItemFromStorage()
    this.findTheCartItemInList()
  }

  findTheCartItemInList = () => {
    const storageCartData = JSON.parse(localStorage.getItem('cartData')) || []

    const {foodItemDetails} = this.props
    const getLoadingItem = storageCartData.filter(
      each => each.id === foodItemDetails.id,
    )
    if (getLoadingItem.length > 0) {
      if (getLoadingItem[0].quantity >= 1) {
        this.setState({quantity: getLoadingItem[0].quantity, isFound: true})
      } else {
        this.setState({isFound: false}, this.removeParticularItemFromStorage)
      }
    }
  }

  removeParticularItemFromStorage = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []

    const filtering = cartData.filter(eachItem => eachItem.quantity >= 1)
    const newCartData = [...filtering]

    localStorage.setItem('cartData', JSON.stringify(newCartData))
    this.findTheCartItemInList()
  }

  onToggleAddButton = () => {
    const {foodItemDetails} = this.props
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const cartItem = {...foodItemDetails, quantity: 1}
    cartData.push(cartItem)
    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.setState({isFound: true})
  }

  decrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItemDetails} = this.props
    const changeStorageData = cartData.map(eachItem => {
      if (eachItem.id === foodItemDetails.id) {
        const quantity = eachItem.quantity - 1
        if (eachItem.quantity >= 1) {
          return {...eachItem, quantity}
        }
      }
      return eachItem
    })

    localStorage.setItem('cartData', JSON.stringify(changeStorageData))
    this.findTheCartItemInList()
  }

  increasingQuantity = () => {
    const {foodItemDetails} = this.props

    const cartData = JSON.parse(localStorage.getItem('cartData'))
    if (cartData !== null) {
      const changeInParticular = cartData.map(eachItem => {
        if (eachItem.id === foodItemDetails.id) {
          const quantity = eachItem.quantity + 1
          return {...eachItem, quantity}
        }
        return eachItem
      })
      const stringifyData = JSON.stringify(changeInParticular)
      localStorage.setItem('cartData', stringifyData)
      this.findTheCartItemInList()
    }
  }

  renderItemsWithPlusMinusButton = () => {
    const {quantity} = this.state
    return (
      <div className="food-item-page-each-item-counter-container">
        <button
          type="button"
          className="food-item-page-button-icon-container"
          testid="decrement-count"
          onClick={this.decrementCartItemQuantity}
        >
          <HiOutlineMinusSm />
        </button>
        <button
          type="button"
          className="food-item-page-count-value"
          testid="active-count"
        >
          {quantity}
        </button>
        <button
          className="food-item-page-button-icon-container"
          type="button"
          testid="increment-count"
          onClick={this.increasingQuantity}
        >
          <BsPlus className="plus-icon" />
        </button>
      </div>
    )
  }

  render() {
    const {foodItemDetails} = this.props
    const {imageUrl, name, cost, rating} = foodItemDetails
    const {isFound} = this.state

    return (
      <li className="food-item-page-list-main-container" testid="foodItem">
        <div className="food-item-page-list-main-image-container">
          <img
            className="food-item-page-list-main-image"
            src={imageUrl}
            alt="food-item"
          />
        </div>
        <div className="food-item-page-list-item-content-container ">
          <h1 className="food-item-page--un-order-list-name">{name}</h1>
          <div className="food-item-page-un-order-list-rupee-container">
            <BiRupee />
            <p className="food-item-page-un-order-cost">{cost}</p>
          </div>
          <div className="food-item-page-un-order-list-rupee-container">
            <AiFillStar className="food-item-page-star" />
            <p>{rating}</p>
          </div>
          {isFound ? (
            this.renderItemsWithPlusMinusButton()
          ) : (
            <button
              onClick={this.onToggleAddButton}
              className="food-item-page-main-button"
              type="button"
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
