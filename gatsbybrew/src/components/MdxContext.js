import React from "react"
import { useStaticQuery } from "gatsby"
import * as R from "ramda"

const MdxContext = React.createContext({})

const solveMdx = ({ mdxs }, name) => {
  return R.find(x => x.fileAbsolutePath.endsWith(name + ".mdx"), mdxs)
}

const useMdx = name => solveMdx(React.useContext(MdxContext), name)

const MdxContextProvider = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            author
            date
            image
            title
          }
          fileAbsolutePath
          body
        }
      }
    }
  `)

  return (
    <MdxContext.Provider value={{ mdxs: data.allMdx.nodes }}>
      {children}
    </MdxContext.Provider>
  )
}

export { MdxContext, MdxContextProvider, useMdx }
