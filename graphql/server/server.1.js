"use strict";

var { graphql, buildSchema } = require('graphql');

// 使用 GraphQL schema language 构建一个 schema
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// 根节点为每个 API 入口端点提供一个 resolver 函数
var root = { hello: () => 'Hello world!' };

// 运行 GraphQL query '{ hello }' ，输出响应
graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});