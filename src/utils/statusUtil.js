import StatusCode from "../constants/statusCode.js";

const statusUtil = {
  success: (data) => {
    return { code: StatusCode.OK, data: data };
  },
  false: () => {
    return { code: StatusCode.ERORR };
  },
};

export default statusUtil; 