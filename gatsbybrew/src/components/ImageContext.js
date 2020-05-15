import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import * as R from "ramda"
// import Parallax from "react-rellax"

const ImageContext = React.createContext({})

const solveImage = ({ imagesData, imagesSharp, imagesSharpLow }, imageName) => {
  if (!imageName) {
    return null
  }
  const findImageData = y => R.find(x => x.name === y, imagesData.nodes)
  const findImageSharp = y =>
    R.find(x => x.fluid.originalName === y, imagesSharp.nodes)
  const findImageSharpLow = y =>
    R.find(x => x.fluid.originalName === y, imagesSharpLow.nodes)

  const imageData = findImageData(imageName)
  const imageSharp = findImageSharp(imageData.image)
  const imageSharpLow = findImageSharpLow(imageData.image)

  return {
    imageData: imageData,
    imageSharp: imageSharp,
    imageSharpLow: imageSharpLow,
  }
}

const useImage = imageName =>
  solveImage(React.useContext(ImageContext), imageName)

const ImageContextProvider = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      imagesData: allImagesYaml {
        nodes {
          image
          name
          alt
        }
      }
      imagesSharp: allImageSharp {
        nodes {
          fluid {
            ...GatsbyImageSharpFluid
            originalName
          }
        }
      }
      imagesSharpLow: allImageSharp {
        nodes {
          fluid(maxWidth: 100) {
            ...GatsbyImageSharpFluid
            originalName
          }
        }
      }
    }
  `)

  return (
    <ImageContext.Provider
      value={{
        imagesSharp: data.imagesSharp,
        imagesData: data.imagesData,
        imagesSharpLow: data.imagesSharpLow,
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}

export { ImageContext, ImageContextProvider, useImage }
