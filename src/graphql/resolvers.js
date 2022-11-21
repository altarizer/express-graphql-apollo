import Member from "../db/models/Member.js";
import StatusCode from "../constants/statusCode.js";

const resolvers = {
  Query: { 
    member: async () => {
      const result = await Member.selectAll();
      return result.data;
    },
  },  

  Mutation: {
    addUser: async (_, { mem_id, mem_username }) => {
      const result = await Member.insert(mem_id, mem_username);
      return result.code === StatusCode.OK ? true : false;
      //return true;
    }, 
  },
};

export default resolvers;