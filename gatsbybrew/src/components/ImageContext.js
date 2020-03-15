import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import * as R from "ramda"
import Parallax from "react-rellax"

const ImageContext = React.createContext({})

const solveImage = ({ imagesData, imagesSharp }, imageName) => {
  if (!imageName) {
    return null
  }
  const findImageData = y => R.find(x => x.name === y, imagesData.nodes)
  const findImageSharp = y =>
    R.find(x => x.fluid.originalName === y, imagesSharp.nodes)

  const imageData = findImageData(imageName)
  const imageSharp = findImageSharp(imageData.image)

  return {
    imageData: imageData,
    imageSharp: imageSharp,
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
    }
  `)

  return (
    <ImageContext.Provider
      value={{
        imagesSharp: data.imagesSharp,
        imagesData: data.imagesData,
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}

export { ImageContext, ImageContextProvider, useImage }
