import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const ListItem = props => {
  const {item} = props
  const {imageUrl, name, cuisine, id, userRating} = item
  const {rating, totalReviews} = userRating

  return (
    <Link
      to={`/restaurant/${id}`}
      style={{textDecoration: 'none'}}
      testid="restaurant-item"
    >
      <li className="home-page-list-item-container">
        <div className="home-list-item-thumbnail-image-container">
          <img
            src={imageUrl}
            alt="restaurant"
            className="home-list-item-thumbnail-image"
          />
        </div>
        <div className="home-un-order-list-item-content-container">
          <h1 className="home-un-order-list-name">{name}</h1>
          <p className="home-un-order-list-cuisine">{cuisine}</p>
          <div className="home-un-order-list-rating">
            <FaStar size="13px" color="#FFCC00" />
            <p className="home-un-order-list-star-rating">{rating}</p>
            <p className="Reviews">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default ListItem
