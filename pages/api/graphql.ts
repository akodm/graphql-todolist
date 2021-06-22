
import { ApolloServer, gql } from 'apollo-server-micro';
import sequelize from '../../src/sequelize';
import { TodoAttributes } from '../../src/sequelize/models/todo';

const { todo } = sequelize.models;

const typeDefs = gql`
  type Query {
    getTodos: [Todo!]!
    getTodo(id: Int!): Todo
  }

  type Todo {
    id: Int
    content: String!
    success: Boolean!
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    create(content: String!): Todo
    update(id: Int!, content: String!): Todo
    check(id: Int!, success: Boolean!): String
    delete(id: Int): String
  }
`;

const resolvers = {
  Query: {
    getTodos: async () => {
      return await todo.findAll();
    },
    getTodo: async (_: any, params: TodoAttributes) => {
      const { id } = params;

      return await todo.findOne({ where: { id } });
    },
  },
  Mutation: {
    create: async (_: any, params: TodoAttributes) => {
      return await todo.create({
        ...params,
        success: false,
      });
    },
    update: async (_: any, params: TodoAttributes) => {
      const { id } = params;

      await todo.update({
        ...params,
      }, {
        where: {
          id,
        }
      });

      return await todo.findOne({ where: { id } });
    },
    check: async (_: any, params: TodoAttributes) => {
      const { id, success } = params;

      const findItem = await todo.findOne({ where: { id } });

      if(findItem && findItem.getDataValue("id")) {
        if(typeof success === "boolean") {
          await todo.update({
            success
          }, {
            where: {
              id,
            }
          });
  
          return "성공적으로 수정되었습니다.";
        }

        return "Boolean 타입이 아닙니다.";
      }

      return "해당 아이템이 존재하지 않습니다.";
    },
    delete: async (_: any, params: TodoAttributes) => {
      const { id } = params;

      const findItem = await todo.findOne({ where: { id } });

      if(findItem && findItem.getDataValue("id")) {
        await todo.destroy({ where: { id } });
        
        return "성공적으로 삭제되었습니다.";
      }

      return "이미 삭제되었거나 존재하지 않습니다.";
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });