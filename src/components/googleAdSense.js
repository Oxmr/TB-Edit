import React, { useEffect } from "react"

export const Adsense = ({ path }) => {
  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [path])

  return (
    <div style={{ padding: "2rem 0" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-5456950369650696"
        data-ad-slot="4365399652"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
