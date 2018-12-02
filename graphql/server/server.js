var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema,GraphQLSchema,GraphQLObjectType,GraphQLString,GraphQLInt } = require('graphql');

let ShopType = new GraphQLObjectType({
    name: 'Shop',
    description:'店铺类型',
    fields: {
      name: {
        type: GraphQLString,
        description: '店铺名'
      },
      count:{
        type: GraphQLInt, description:'数量'
      }
    }
});

let MemberType = new GraphQLObjectType({
  name: 'Member',
  description: '会员信息',
  fields: {
    age: {
      type: GraphQLInt,
      resolve: function(){return 266;},
      description: 'age呵呵 '
    },
    shop: {
      type : ShopType,
      resolve:function(root,parms,ctx){ return root.shop(); },
      description: '会员所属店铺信息'
    }
  }
});


// 创建一个 schema
var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'Query description.',
    fields: {
      age: {
        type: GraphQLString,
        description: 'age '
      },
      name: {
        type: GraphQLString,
        description: '姓名'
      },
      member: {
        type: MemberType,description:'会员信息'
      }
    }
  })
});

// root 提供所有 API 入口端点相应的解析器函数
var root = {
  hello: () => {
    return 'Hello world!';
  },
  member: () => {
    console.log('执行member()')
    return { age: 22};
  },
  shop: () => {
    console.log('执行shop()')
    return {name:'店铺名',count:2322};
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