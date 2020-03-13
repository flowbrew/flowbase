import React, { Component } from "react"
import { navigate } from "@reach/router"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

import InputMask from "react-input-mask"
import * as R from "ramda"

import PageLayout from "../layouts/PageLayout"
import {
  useCoupon,
  setActivePromocode,
  expireCoupon,
} from "../components/Coupon"

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
  CircularProgress,
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  anchor: {
    display: "block",
    position: "relative",
    top: -90,
    visibility: "hidden",
  },
}))

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

const TF = ({ children, name, ...props }) => {
  const classes = useStyles()

  return (
    <Box mb={MARGIN}>
      <Box id={name} component="div" className={classes.anchor} />
      <TextField variant="outlined" name={name} {...props} fullWidth>
        {children}
      </TextField>
    </Box>
  )
}

const Contacts = ({ state, onChange, onBlur }) => {
  return (
    <OutlinedSection>
      <TF
        name="name"
        error={state.name_error}
        helperText={state.name_error && "Укажите ваше имя"}
        value={state.name}
        label="Имя"
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      <InputMask
        mask="+7 (999) 999-99-99"
        value={state.phone}
        onChange={onChange}
        onBlur={onBlur}
      >
        <TF
          name="phone"
          error={state.phone_error}
          helperText={state.phone_error && "Неверный телефон"}
          type="tel"
          value={state.phone}
          label="Телефон"
          onChange={onChange}
          onBlur={onBlur}
          required
        />
      </InputMask>
    </OutlinedSection>
  )
}

const shippingFromCity = (product, city) =>
  R.find(R.pathEq(["destination"], city || ""), product.shipping)

const Shipping = ({ product, state, onChange, onBlur }) => {
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
        error={state.shipping_address_error}
        helperText={state.shipping_address_error && "Укажите ваш адрес"}
        value={state.shipping_address}
        label="Адрес"
        onChange={onChange}
        onBlur={onBlur}
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

const BuyButton = ({ state, handleCheckout }) => {
  const classes = useStyles()

  return (
    <Container>
      <Box width="100%">
        <Box display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="secondary"
            disabled={state.purchasing}
            onClick={handleCheckout}
          >
            Купить
            {state.purchasing && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

const validate_ = (name, value) => {
  switch (name) {
    case "phone":
      return value.match(/\+\d \(\d\d\d\) \d\d\d-\d\d-\d\d/)

    case "name":
    case "shipping_address":
      return value.length > 0

    default:
      return true
  }
}

const onInvalidForm = errorItem => {
  navigate("#" + errorItem)
}

const onPurchase = (product, result) => {
  console.info(result)
  expireCoupon(product)
  navigate("/спасибо")
}

const onPurchaseError = (product, e) => {
  console.error(e)
  navigate("/ошибка")
}

const CheckoutForm = ({ data }) => {
  const product = useCoupon(data.product)

  const [state, setState] = React.useState({
    name: "",
    phone: "",
    shipping_city: product.shipping[0].destination,
    shipping_address: "",
    promocode: product.promocode || "",
    comment: "",
    purchasing: false,
  })

  const findErrorInForm = () => {
    const items = R.map(([k, v]) => [k, validate(k, v)], R.toPairs(state))
    const result = R.find(([k, v]) => !v, items)
    return result && result[0]
  }

  const validate = (name, value) => {
    const isValid = validate_(name, value)

    setState(prevState => {
      return { ...prevState, [name + "_error"]: !isValid }
    })

    return isValid
  }

  const handleValidation = event => {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name

    validate(name, value)
  }

  const handleInputChange = event => {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name

    const value2 = name === "promocode" ? value.toUpperCase() : value
    if (name == "promocode") {
      setActivePromocode(product, value2)
    }

    setState(prevState => {
      return { ...prevState, [name]: value2, [name + "_error"]: false }
    })
  }

  const shipping = shippingFromCity(product, state.shipping_city)

  const order = [
    {
      ...product,
      description: product.name,
    },
    {
      price: 0.0,
      description: "Набор для заварки",
    },
    {
      price: shipping.cost,
      description: "Доставка",
    },
  ]

  const handleCheckout = async () => {
    const errorItem = findErrorInForm()

    if (errorItem) {
      onInvalidForm(errorItem)
      return
    }

    setState(prevState => {
      return { ...prevState, purchasing: true }
    })

    try {
      const response = await fetch(process.env.GATSBY_REST_API, {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({
          name: state.name,
          phone: state.phone,
          total_order_price: totalOrderPrice(order),
          shipping_city: state.shipping_city,
          shipping_address: state.shipping_address,
          shipping: shipping,
          promocode: state.promocode,
          comment: state.comment,
          order: order,
        }),
      })
      const json = await response.json()
      onPurchase(product, json.result)
    } catch (e) {
      onPurchaseError(product, e)
    } finally {
      setState(prevState => {
        return { ...prevState, purchasing: false }
      })
    }
  }

  return (
    <>
      <ProductImage product={product} />
      <Contacts
        state={state}
        onChange={handleInputChange}
        onBlur={handleValidation}
      />
      <Shipping
        state={state}
        product={data.product}
        onChange={handleInputChange}
        onBlur={handleValidation}
      />
      <Order order={order} />
      <Misc state={state} onChange={handleInputChange} />
      <BuyButton state={state} handleCheckout={handleCheckout} />
    </>
  )
}

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

  return (
    <PageLayout
      location={location}
      pageContext={{ frontmatter: { title: "Оформление заказа" } }}
    >
      <CheckoutForm data={data} />
    </PageLayout>
  )
}
