import React, { Component } from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

import * as R from "ramda"
import PageLayout from "../layouts/PageLayout"

import {
  mapi,
  Section,
  H,
  H2,
  P,
  UL,
  LI,
  FLBPaper,
  ImageBlock,
  SmallImageBlock,
  RedBox,
  CrossedBox,
} from "../common"

import {
  Container,
  Paper,
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core"

const MARGIN = 2

const OutlinedSection = ({ children }) => (
  <Box mt={MARGIN}>
    <Container>
      <Paper variant="outlined">
        <Box pl={MARGIN} pr={MARGIN} pt={MARGIN}>
          {children}
        </Box>
      </Paper>
    </Container>
  </Box>
)

const ProductImage = ({ product }) => {
  return <SmallImageBlock image={product.images[0]} />
}

const TF = ({ ...props }) => {
  return (
    <Box mb={MARGIN}>
      <TextField variant="outlined" {...props} fullWidth />
    </Box>
  )
}

const Contacts = ({ state, onChange }) => {
  return (
    <OutlinedSection>
      <TF
        name="name"
        value={state.name}
        label="Имя"
        onChange={onChange}
        required
      />
      <TF
        name="phone"
        value={state.phone}
        label="Телефон"
        onChange={onChange}
        required
      />
    </OutlinedSection>
  )
}

const shippingFromCity = (product, city) =>
  R.find(R.pathEq(["destination"], city || ""), product.shipping)

const Shipping = ({ product, state, onChange }) => {
  const shipping = shippingFromCity(product, state.shipping_city)

  return (
    <OutlinedSection>
      <Box mb={MARGIN}>
        <FormControl component="fieldset">
          <Box mb={MARGIN}>
            <FormLabel component="legend">Город</FormLabel>
          </Box>
          <RadioGroup
            value={state.shipping_city}
            name="shipping_city"
            onChange={onChange}
          >
            {mapi(
              ({ destination, cost, description }, i) => (
                <FormControlLabel
                  value={destination}
                  control={<Radio />}
                  label={destination}
                  key={destination}
                />
              ),
              product.shipping || []
            )}
          </RadioGroup>
        </FormControl>
      </Box>
      <TF
        name="shipping_address"
        value={state.address}
        label="Адрес"
        onChange={onChange}
        required
      />
      {shipping && <P>{shipping.description}</P>}
    </OutlinedSection>
  )
}

function formatFloat(x) {
  return `${(x || 0.0).toFixed(0)}`
}

const OrderRow = ({ price, description, old_price, old_price_description }) => {
  return (
    <TableRow>
      <TableCell>
        {!old_price_description ? (
          <>{description}</>
        ) : (
          <>
            {description}
            <br />
            <RedBox>{old_price_description}</RedBox>
          </>
        )}
      </TableCell>
      <TableCell align="right">
        {!(old_price && old_price != price) ? (
          <>{formatFloat(price)}</>
        ) : (
          <>
            <CrossedBox>{formatFloat(old_price)}</CrossedBox>
            <br />
            <RedBox>{formatFloat(price)}</RedBox>
          </>
        )}
      </TableCell>
    </TableRow>
  )
}

const totalOrderPrice = R.compose(R.sum, R.map(R.path(["price"])))

const OrderTable = ({ order }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Наименование</TableCell>
            <TableCell align="right">Цена</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mapi(
            ({ ...x }, i) => (
              <OrderRow key={i} index={i} {...x} />
            ),
            order || []
          )}
          <TableRow>
            <TableCell>Итого</TableCell>
            <TableCell align="right">{totalOrderPrice(order)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Order = ({ order }) => {
  return (
    <OutlinedSection>
      <Box mb={MARGIN}>
        <OrderTable order={order} />
      </Box>
      <P>Оплата после получения.</P>
      <P>
        Если это ваш первый заказ, то вы получите бесплатный набор для заварки.
      </P>
    </OutlinedSection>
  )
}

const Misc = ({ state, onChange }) => (
  <Box mt={MARGIN}>
    <Container>
      <TF
        name="promocode"
        value={state.promocode}
        label="Промокод"
        onChange={onChange}
      />
      <TF
        name="comment"
        value={state.comment}
        label="Комментарий"
        onChange={onChange}
      />
    </Container>
  </Box>
)

export default ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      product: productsYaml(pid: { eq: "flowbrew60" }) {
        name
        pid
        price
        quantity
        images
        benefits
        in_depth_benefits
        shipping {
          destination
          cost
          description
        }
        weight
      }
    }
  `)

  const product = data.product
  const title = `${product.name} ${product.weight} г`

  const [state, setState] = React.useState({
    name: "",
    phone: "",
    shipping_city: product.shipping[0].destination,
    shipping_address: "",
    promocode: "",
    comment: "",
  })

  const handleInputChange = event => {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name

    const value2 = name === "promocode" ? value.toUpperCase() : value

    setState({ ...state, [name]: value2 })
  }

  const order = [
    {
      price: product.price * 0.9,
      description: title,
      old_price: product.price,
      old_price_description: "Скидка 10%",
    },
    {
      price: 0.0,
      description: "Набор для заварки",
    },
    {
      price: 0.0,
      description: "Доставка",
    },
  ]

  return (
    <PageLayout
      location={location}
      pageContext={{ frontmatter: { title: "Оформление заказа" } }}
    >
      <ProductImage product={product} />
      <Contacts state={state} onChange={handleInputChange} />
      <Shipping
        state={state}
        product={data.product}
        onChange={handleInputChange}
      />
      <Order order={order} />
      <Misc state={state} onChange={handleInputChange} />
      <Container>
        <Box width="100%">
          <Box display="flex" justifyContent="flex-end">
            <Button
              href="/checkout"
              size="large"
              variant="contained"
              color="secondary"
            >
              Купить
            </Button>
          </Box>
        </Box>
      </Container>
    </PageLayout>
  )
}
