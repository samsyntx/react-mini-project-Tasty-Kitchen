import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SliderRoute = props => {
  const {sliderData} = props

  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 700,
    infinite: true,
    dotsClass: 'slick-dots',
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  }

  return (
    <Slider {...settings}>
      {sliderData.map(eachSlide => (
        <img src={eachSlide.image_url} alt="offer" key="carousel-image" />
      ))}
    </Slider>
  )
}

export default SliderRoute
