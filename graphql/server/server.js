var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// 使用 GraphQL Schema Language 创建一个 schema
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// root 提供所有 API 入口端点相应的解析器函数
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');


/**
 * 启动命令： node server.js
 * 由于我们对 graphqlHTTP 设置 graphiql: true，你可以使用 GraphiQL 工具来手动执行 GraphQL 查询。
 * 若使用浏览器浏览 http://localhost:4000/graphql，你会看到一个界面能让你输入查询语句。
 */