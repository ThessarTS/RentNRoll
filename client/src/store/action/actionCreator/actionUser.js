import axios from "axios";

const baseUrl =
  "https://003e-2001-448a-6021-5c1-1ce5-bdb-d488-5ae0.ngrok-free.app";

export const handleRegister = (value) => {
  console.log(value, "<<< action");
  return async (dispatch) => {
    try {
      const { data } = await axios({
        url: baseUrl + "/register",
        method: "POST",
        data: value,
      });
      console.log(data);
      //   dispatch(categoriesFetchSuccess(data));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
