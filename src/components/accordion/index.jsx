import { useState } from "react"


export const Accordion = (props) => { 
  const { items } = props
  const [currentItem, setCurrentItem] = useState(null)

  return (
    <div className="custom-accordion">
      {
        items.map((item, index) => (
          <div key={index} className="item">
            <div className="title">
              <div>
                <span>{ ('0' + (index + 1)).slice(-2)}</span>
                {item.title}  
              </div>
              <div>
                <div className={`image ${currentItem === index ? 'active' : ''}`} onClick={() => setCurrentItem(currentItem === index ? null : index)}>
                  <img src={`assets/images/vector-right.png`} width={28} height={25}/>
                </div>
              </div>
            </div>
            <div className={`content ${currentItem === index ? 'active' : ''}`}>
              {item.content}
            </div>
          </div>
        ))
      }
    </div>
  )
}