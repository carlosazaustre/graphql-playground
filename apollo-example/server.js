'use strict'

const fs = require('fs')
const path = require('path')
const http = require('http')
const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const app = express()
const server = http.createServer(app)

const schema = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
const typeDefs = gql(schema)

const users = [
  {
    name: 'User #1',
    email: 'user@email.com',
    age: 25,
    status: 'ACTIVE'
  },
  {
    name: 'User #2',
    email: 'another@email.com',
    age: 34,
    status: 'SUSPENDED'
  },
  {
    name: 'Kiddo',
    email: 'little@email.com',
    age: 16,
    status: 'SUSPENDED'
  }
]

const resolvers = {
  Query: {
    async users (root, args, ctx, info) {
      const { status } = args
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const result = users.filter(u => u.status === status)
          resolve(result)
        }, 2000)
      })
    }
  },
  Mutation: {
    createUser (root, args, ctx, info) {
      const { user } = args
      users.push(user)
      return user
    }
  }
}

const api = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  tracing: true
})

api.applyMiddleware({
  app,
  path: '/api'
})

server.listen(8800, () => {
  console.log('Server listening on http://localhost:8800/api')
})
