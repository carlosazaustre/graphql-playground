'use strict'

const { graphql } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  type Query {
    helloWorld: HelloWorld
  }

  type HelloWorld {
    message: String
    author: User
  }

  type User {
    name: String
  }
`

const resolvers = {
  Query: {
    helloWorld: () => ({
      message: 'Hello world from types on GraphQL'
    })
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const query = `
  query Hello {
    helloWorld {
      message
    }
  }
`
graphql(schema, query).then(result => console.log(result))
