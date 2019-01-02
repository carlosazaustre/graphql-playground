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
    age: 25
  },
  {
    name: 'User #2',
    email: 'another@email.com',
    age: 34
  }
]

const resolvers = {
  Query: {
    users (root, args, ctx, info) {
      const { age } = args
      if (age) {
        return users.filter(u => u.age > age)
      }
      return users
    }
  }
}

const api = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true
})

api.applyMiddleware({
  app,
  path: '/api'
})

server.listen(8800, () => {
  console.log('Server listening on http://localhost:8800/api')
})
