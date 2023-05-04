import axios from 'axios'

export function postUser(user) {
    return async function (dispatch) {
      try {
        let jsonUser = {name: user.name, password: user.password}
        const json = await axios.post('/user/register', jsonUser);
        return dispatch({
          type: "REGISTER_STATUS",
          payload: json.data.status
        })
      }
      catch (err) {
        return dispatch({
          type: "REGISTER_STATUS",
          payload: "error"
        })
      }
  
    }
  };

  export function postLogin(jsonUser) {
    return async function (dispatch) {
      try {
        const json = await axios.post(`/user/login`, jsonUser);
        if (json.data.status === "ok") {
          let response = json.data.data
          localStorage.setItem("AuthLogin", response.token)
          localStorage.setItem("userId", response.id)

        }
        return dispatch({
          type: "LOGIN_STATUS",
          payload: json.data.status
        })
      }
      catch (err) {
        return dispatch({
          type: "LOGIN_STATUS",
          payload: "error"
        })
      }
  
    }
  };

//Traer Token de localstorage
const token = localStorage.getItem("AuthLogin")

  //Traer todos los mensajes
export const getAllMessages = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`/messages`);
      return dispatch({
        type: "GET_ALL_MESSAGES",
        payload: json.data.data
      })
    }
    catch (error) {
      console.log(error);
    }
  };
};

//Mandar mensaje nuevo
export const postNewMessage = (message) => {
  return async (dispatch) => {
    try {
      const json = await axios.post(`/messages`, message)
      return dispatch({
        type: "NEW_MESSAGE",
        payload: json.data.status
      })
    }
    catch (error) {
      console.log(error);
    }
  };
};

export const setStatusPostMessage = () => {

  return ({ type: "SET_STATUS", payload: '' });
};
