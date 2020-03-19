import React from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import * as R from "ramda"
import PageLayout from "../layouts/PageLayout"
import { useImage } from "../components/ImageContext"
import { mapi, Section } from "../common"
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  CardHeader,
  Avatar,
} from "@material-ui/core"

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
        <Card>
          <CardActionArea onClick={() => navigate(path)}>
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
          description: "Чай матча",
          image: "hero",
        },
      }}
    >
      <BlogSection pages={pages} />
    </PageLayout>
  )
}
