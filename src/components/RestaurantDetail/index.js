/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetail extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantData: [],
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  convertItemsData = foodArray => {
    const item = {
      cost: foodArray.cost,
      foodType: foodArray.food_type,
      id: foodArray.id,
      imageUrl: foodArray.image_url,
      name: foodArray.name,
      rating: foodArray.rating,
    }

    return item
  }

  convertData = object => {
    const converted = {
      costForTwo: object.cost_for_two,
      cuisine: object.cuisine,
      foodItems: object.food_items.map(eachItem =>
        this.convertItemsData(eachItem),
      ),
      restaurantId: object.id,
      imageUrl: object.image_url,
      itemCount: object.items_count,
      location: object.location,
      name: object.name,
      opensAt: object.opens_at,
      rating: object.rating,
      reviewsCount: object.reviews_count,
    }
    return converted
  }

  getRestaurantData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    const data = await response.json()

    if (response.ok === true) {
      const convertedData = this.convertData(data)
      this.setState({
        apiStatus: apiStatusConstants.success,
        restaurantData: convertedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  foodItemsView = () => {
    const {restaurantData} = this.state
    const {foodItems} = restaurantData

    return (
      <ul className="restaurant-detail-page-un-order-list">
        {foodItems.map(eachItem => (
          <FoodItem key={eachItem.id} foodItemDetails={eachItem} />
        ))}
      </ul>
    )
  }

  restaurantSuccessPage = () => {
    const {restaurantData} = this.state

    const {
      costForTwo,
      name,
      cuisine,
      imageUrl,
      location,
      rating,
      reviewsCount,
    } = restaurantData

    return (
      <div>
        <div className="product-detail-restro-intro-complete-container">
          <img
            className="restaurant-detail-page-image-main"
            src={imageUrl}
            alt="restaurant"
          />
          <div className="restaurant-detail-page-main-top-content">
            <h1 className="restaurant-detail-page-main-heading">{name}</h1>
            <p className="restaurant-detail-page-main-cuisine">{cuisine}</p>
            <p className="restaurant-detail-page-main-location">{location}</p>
            <div className="restaurant-detail-page-main-rate-container">
              <div className="restaurant-detail-page-main-bottom-container-left">
                <div className="restaurant-detail-page-main-flex">
                  <AiFillStar />
                  <p className="detail-page-rating-and-rupees">{rating}</p>
                </div>
                <p className="detail-page-rating-and-rupees-details">
                  {reviewsCount}+ Ratings
                </p>
              </div>
              <div className="detail-page-main-vertical-line">{null}</div>
              <div className="restaurant-detail-page-main-bottom-container-right">
                <div className="restaurant-detail-page-main-flex">
                  <BiRupee />
                  <p className="detail-page-rating-and-rupees">{costForTwo}</p>
                </div>
                <p className="detail-page-rating-and-rupees-details">
                  Cost for two
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="restaurant-detail-all-foods-list-container">
          {this.foodItemsView()}
        </div>
      </div>
    )
  }

  restaurantsDisplayLoading = () => (
    <div testid="restaurant-details-loader">
      <Loader
        className="restaurant-detail-page-loader"
        type="Oval"
        color="#ffa412"
        height="50"
        width="50"
      />
    </div>
  )

  renderRestaurantDetailView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.restaurantSuccessPage()
      case apiStatusConstants.inProgress:
        return this.restaurantsDisplayLoading()
      case apiStatusConstants.failure:
        return null
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderRestaurantDetailView()}</div>
        <Footer />
      </>
    )
  }
}
export default RestaurantDetail
