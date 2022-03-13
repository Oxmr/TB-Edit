import ReactDOM from "react-dom"
import { Adsense } from "./googleAdSense"
import * as React from "react"

export const InjectGoogleAds = (parentNodes, location) => {
  for (let i = 1; i < parentNodes.length; i++) {
    let item = parentNodes.item(i)
    if (item.firstChild.nodeName !== "DIV") {
      const newDiv = document.createElement("div")
      newDiv.id = `google-ad-${i}`
      item.prepend(newDiv)
      ReactDOM.render(
        <Adsense path={location.path} />,
        document.getElementById(`google-ad-${i}`)
      )
      i++
    }
  }
}
