import React from "react"
import { Box } from "@material-ui/core"
import { useEffectOnlyOnce, P } from "../common"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGift } from "@fortawesome/free-solid-svg-icons"

export default ({ product, children, ...props }) => {
  const [count, setCount] = React.useState({
    count: 0,
  })

  useEffectOnlyOnce(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.GATSBY_REST_API + "/product?pid=" + product.pid
      )

      const json = await response.json()

      if (json.product) {
        setCount(json.product.quantity)
      }
    }

    fetchData()
  })

  return (
    <Box {...props}>
      <P>
        Я дарю бесплатный набор для заварки новым клиентам.{" "}
        {count > 0 && (
          <>
            Осталось {count} <FontAwesomeIcon icon={faGift} />
          </>
        )}
      </P>
      {children}
    </Box>
  )
}
