import React, { Component, useEffect } from "react"
import { navigate } from "@reach/router"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import StyledLink from "../components/StyledLink"
import { Link } from "gatsby"

import InputMask from "react-input-mask"
import * as R from "ramda"

import PageLayout from "../layouts/PageLayout"
import { useImage } from "../components/ImageContext"
import {
  applyCoupon,
  setActivePromocode,
  expireCoupon,
} from "../components/Coupon"

import {
  mapi,
  Section,
  H,
  H2,
  H3,
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
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  CardHeader,
  Avatar,
  IconButton,
  MoreVertIcon,
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({}))

const PostCard = ({
  path,
  context: {
    frontmatter: { author, date, title, image, description },
  },
}) => {
  const dateStr = new Date(date).toLocaleDateString("ru-RU")

  const { imageData, imageSharp } = useImage(image)

  const avatar = useImage("kozin_aleksey")

  return (
    <Grid item xs={12} sm={6}>
      <Link to={path} style={{ textDecoration: "none" }}>
        <Card>
          <CardActionArea>
            <CardHeader
              avatar={
                <Avatar
                  alt={avatar.imageData.alt}
                  src={avatar.imageSharp.fluid.src}
                />
              }
              title={author}
              subheader={dateStr}
            />
            <CardMedia
              image={imageSharp.fluid.src}
              title={imageData.alt}
              style={{ paddingTop: "56.25%" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  )
}

const BlogSection = ({ pages }) => {
  const f = (x, i) => <PostCard key={i} {...x} />
  const posts = R.compose(
    mapi(f),
    R.filter(
      ({
        context: {
          frontmatter: { hidden },
        },
      }) => !hidden
    )
  )

  return (
    <Section>
      <Grid container spacing={3}>
        {posts(pages)}
      </Grid>
    </Section>
  )
}

export default ({ location }) => {
  const data = useStaticQuery(graphql`
    {
      allSitePage(filter: { path: { regex: "//blog/./" } }) {
        nodes {
          path
          context {
            frontmatter {
              author
              date
              title
              image
              description
              hidden
            }
          }
        }
      }
    }
  `)

  const pages = data.allSitePage.nodes

  return (
    <PageLayout
      location={location}
      pageContext={{
        frontmatter: {
          title: "Блог",
          description: "Японский чай матча",
          image: "hero",
        },
      }}
    >
      <BlogSection pages={pages} />
    </PageLayout>
  )
}
