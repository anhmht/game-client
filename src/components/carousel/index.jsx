import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useState } from "react";

export const CustomCarousel = (props) => { 
  const { slides } = props
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className="custom-carousel">
      <Carousel
        autoPlay={true}
        autoFocus={false}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        showArrows={false}
        selectedItem={currentSlide}
        onChange={setCurrentSlide}>
        {
          slides.map((slide, index) => (
            <div key={index}>
              <img src={slide.image} alt={slide.title} />
            </div>
          ))
        }
      </Carousel>
      <div className="handler">
        <img className="left-arrow" src="assets/images/arrow-left.png" onClick={() => {
          if (currentSlide === 0) {
            setCurrentSlide(slides.length - 1)
            return
          } 
          setCurrentSlide(currentSlide - 1)
        }} />
        <img className="right-arrow" src="assets/images/arrow-right.png" onClick={() => {
          if(currentSlide === slides.length - 1) {
            setCurrentSlide(0)
            return
          }
          setCurrentSlide(currentSlide + 1)
        }} />
      </div>
      <div className="indicators">
        <h2>{slides[currentSlide].title}</h2>
        <ul>
          {
            slides.map((slide, index) => (
              <li key={index} className={currentSlide === index ? 'active' : ''} onClick={() => setCurrentSlide(index)}></li>
            ))
          }
        </ul>
      </div>
      <img className="bubble" src="assets/images/bubble.png" />
    </div>
  )
}