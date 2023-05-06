import axios from 'axios'
import Swal from 'sweetalert2';

//Traer Token de localstorage


export const createToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon,
    title,
  });
};

export const setLoading = (status) => {
  return ({ type: "SET_LOADING", payload: status });
};

export function postUser(user) {
    return async function (dispatch) {
      try {
        let jsonUser = {name: user.name, password: user.password}
        const json = await axios.post('/user/register', jsonUser);
        if (json.data.status === "ok") {
          createToast("success", "Registered successfully");
        }
        else {
          createToast("error", "Couldn't register");
        }

        return dispatch({
          type: "REGISTER_STATUS",
          payload: json.data.status
        })
      }
      catch (err) {
        createToast("error", "Couldn't register");
        return dispatch({
          type: "REGISTER_STATUS",
          payload: 'error'
        })
      }
  
    }
  };

  export function postLogin(jsonUser) {
    return async function (dispatch) {
      try {
        const json = await axios.post(`/user/login`, jsonUser);
        if (json.data.status === "ok") {
          createToast("success", "Logged in successfully");
          let response = json.data.data
          localStorage.setItem("AuthLogin", response.token)
          localStorage.setItem("userId", response.id)
        }
        else createToast("error", "Couldn't login: incorrect name or password");
        console.log(json.data.status)
        dispatch(setLoading(false))
        return dispatch({
          type: "LOGIN_STATUS",
          payload: json.data.status
        })
      }
      catch (err) {
        createToast("error", "Couldn't login: incorrect name or password");
        dispatch(setLoading(false))
      }
  
    }
  };


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
      const json = await axios.post(`/mensajes`, message)
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



  //vaciar chat
  export const deleteChat = () => {
    return (dispatch) => {
      try {
        Swal.fire({
          title: "Empty Chat",
          text: "Are you sure you want to empty the chat?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, I'm sure",
          cancelButtonText: "Cancel",
          confirmButtonColor: "#007bff",
          cancelButtonColor: "#ddd",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const json = await axios.delete(`/messages`);
            createToast(
              "success",
              "Done! The chat was emptied successfully."
            );
            return dispatch({
              type: "DELETE_CHAT",
              payload: json.data.data
            });
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            createToast(
              "error",
              "Chat was not emptied."
            );
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  
  