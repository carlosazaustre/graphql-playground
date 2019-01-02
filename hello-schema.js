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
      message: 'Hello world from types on GraphQL',
      author: ''
    })
  },
  User: {
    name: () => 'Guest'
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const query = `
  query Hello {
    helloWorld {
      message
      author {
        name
      }
    }
  }
`
graphql(schema, query).then(result => console.log(JSON.stringify(result, null, 2)))
