import { translate } from "@/src/languages"
import { Button } from "@/src/modules"

export const Newsletter = () => { 
  return (
    <div className="newsletter">
      <div className="image">
        <img src="/assets/images/qa_banner.png" alt="" />
        <div className="container">
          <h2>SUBSCRIBE AND RECEIVE OUR NEWSLETTER TO FOLLOW THE NEWS</h2>
          <form>
            <div className="email-input">
              <input type="email" placeholder="Enter email address" />
              <Button label={'SEND'}  />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}