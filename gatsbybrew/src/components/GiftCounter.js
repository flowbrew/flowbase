import React from "react"
import { Box } from "@material-ui/core"
import { useEffectOnlyOnce, P } from "../common"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGift } from "@fortawesome/free-solid-svg-icons"

export default ({ product, children, small = false, ...props }) => {
  const [count, setCount] = React.useState({
    count: 0,
  })

  useEffectOnlyOnce(() => {
    let mounted = true;

    const fetchData = async () => {
      const response = await fetch(
        process.env.GATSBY_REST_API + "/product?pid=" + product.pid
      )

      const json = await response.json()

      if (mounted && json.product) {
        setCount(json.product.quantity)
      }
    }

    fetchData()

    return () => mounted = false;
  })

  return (
    <Box {...props}>
      <P>
        {small ? "" : "Я дарю бесплатный бамбуковый венчик для заварки новым клиентам."}
      </P>
      {count > 0 && (
          <P>
            Осталось {count} <FontAwesomeIcon icon={faGift} />
          </P>
        )}
      {children}
    </Box>
  )
}
