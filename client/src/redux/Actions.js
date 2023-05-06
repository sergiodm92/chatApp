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

export function postUser(user) {
    return async function (dispatch) {
      try {
        let jsonUser = {name: user.name, password: user.password}
        const json = await axios.post('/user/register', jsonUser);
        if (json.data.status === "ok") {
          createToast("success", "Se registró correctamente");
        }
        else {
          createToast("error", "No pudo registrarse");
        }
        return dispatch({
          type: "REGISTER_STATUS",
          payload: json.data.status
        })
      }
      catch (err) {
        createToast("error", "No pudo registrarse");
      }
  
    }
  };

  export function postLogin(jsonUser) {
    return async function (dispatch) {
      try {
        const json = await axios.post(`/user/login`, jsonUser);
        if (json.data.status === "ok") {
          createToast("success", "ingresó correctamente");
          let response = json.data.data
          localStorage.setItem("AuthLogin", response.token)
          localStorage.setItem("userId", response.id)
        }
        else createToast("error", "No pudo ingresar name o password incorrectos");
        return dispatch({
          type: "LOGIN_STATUS",
          payload: json.data.status
        })
      }
      catch (err) {
        createToast("error", "No pudo ingresar name o password incorrectos");

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
        title: "Vaciar Chat",
        text: "¿Esta seguro que desea vaciar el chat?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Estoy seguro",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#007bff",
        cancelButtonColor: "#ddd",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const json = await axios.delete(`/messages`)
          createToast(
            "success",
            "¡Listo! Se vacio correctamente el chat"
          );
          return dispatch({
            type: "DELETE_CHAT",
            payload: json.data.data
          })
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          createToast(
            "error",
            "No se vacio el Chat"
          );
        }
      });
    }
    catch (error) {
      console.log(error);
    }
  };
};
  
  