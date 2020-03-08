import React, { Component } from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

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
  return <SmallImageBlock image={product.images[0]} ratio={1 / 1} />
}

const TF = ({ ...props }) => {
  return (
    <Box mb={MARGIN}>
      <TextField variant="outlined" {...props} fullWidth />
    </Box>
  )
}

const Contacts = () => {
  return (
    <OutlinedSection>
      <TF id="name" label="Имя" required />
      <TF id="phone" label="Телефон" required />
    </OutlinedSection>
  )
}

const Shipping = ({ product }) => {
  return (
    <OutlinedSection>
      <Box mb={MARGIN}>
        <FormControl component="fieldset">
          <Box mb={MARGIN}>
            <FormLabel component="legend">Город</FormLabel>
          </Box>
          <RadioGroup
            defaultValue="moscow"
            aria-label="gender"
            name="customized-radios"
          >
            <FormControlLabel
              value="moscow"
              control={<Radio />}
              label="Москва"
            />
            <FormControlLabel
              value="spb"
              control={<Radio />}
              label="Санкт-Петербург"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Другой город"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <TF id="adress" label="Адрес" required />

      <P>
        Мы доставим заказ курьером в Москву за 2-4 рабочих дня (не доставляем в
        выходные и праздники).
      </P>
    </OutlinedSection>
  )
}

const OrderTable = ({ product }) => {
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
            ({ x, i }) => (
              <TableRow key={i}>
                <TableCell>{0}</TableCell>
                <TableCell align="right">{0}</TableCell>
              </TableRow>
            ),
            []
          )}
          <TableRow>
            <TableCell>Итого</TableCell>
            <TableCell align="right">{420.0}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Order = ({ product }) => {
  return (
    <OutlinedSection>
      <Box mb={MARGIN}>
        <OrderTable product={product} />
      </Box>
      <P>
        Если это ваш первый заказ, то вы получите бесплатный набор для заварки.
      </P>
      <P>Оплата после получения.</P>
    </OutlinedSection>
  )
}

const Misc = () => (
  <Box mt={MARGIN}>
    <Container>
      <TF id="promocode" label="Промокод" />
      <TF id="comment" label="Комментарий" />
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
      }
    }
  `)

  return (
    <PageLayout
      location={location}
      pageContext={{ frontmatter: { title: "Оформление заказа" } }}
    >
      <ProductImage product={data.product} />
      <Contacts />
      <Shipping product={data.product} />
      <Order product={data.product} />
      <Misc />
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
