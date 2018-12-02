var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema,GraphQLSchema } = require('graphql');

// 使用 GraphQL Schema Language 创建一个 schema
var schema = buildSchema(`
  enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
  }
  type Member {
    age: Int
  }
  input MemberP {
    age: Int
  }
  type Query {
    hello: String 
    userName: String 
    appearsIn: [Episode] 
    member: Member
  }
  type Mutation {
    memberUpdate(member: MemberP): Member
  }
`);
// let schema1 = new GraphQLSchema()

// root 提供所有 API 入口端点相应的解析器函数
var root = {
  hello: () => {
    return 'Hello world!';
  },
  member: () => {
    return { age: 22 };
  },
  memberUpdate: (member) => {
      console.log(JSON.stringify(member));
      return { age: member.member.age };
  }
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

 /**
  * 
  new GraphQLSchema({
  query: new GraphQLObjectType({
    // 在嵌套较多的情况下， name 属性很容易被漏掉
    name: 'AccountType',
    // descriptiton 可以很好的帮助开发者和 api 使用者理解字段意义，但不是必填项，平时开发中很容易偷懒不写
    description: 'Account description.',
    // 一定要有 fields
    fields: {
      name: {
        // fields 的子属性一定要有 type 属性
        type: GraphQLString
        args: {
          // 如果有 args ， args 也一定要有 type 属性
          type: GraphQLString
        }
      }
    }
  })
})
  */