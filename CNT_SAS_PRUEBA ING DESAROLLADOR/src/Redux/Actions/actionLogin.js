import { types } from "../types/types";

import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { Export } from "../../firebase/firebaseConfig";
const { Google, Facebook } = Export();

export const loginEmailPassword = (Email, Password) => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, Email, Password)
      .then(({ user }) => {
        console.log(user);
        dispatch(LoginSincrono(user.uid, user.displayName));
        //console.log('Bienvenid@');
      })
      .catch((e) => {
        //console.log(e);
        //console.log('El usuario no existe');
      });
  };
};

//Login Google
export const LoginGoogle = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, Google)
      .then(({ user }) => {
        dispatch(LoginSincrono(user.uid, user.displayName));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

//Login con facebook
export const LoginFacebook = () => {
    return (dispatch) => {
      const auth = getAuth();
      signInWithPopup(auth, Facebook)
        .then(({ user }) => {
          dispatch(LoginSincrono(user.uid, user.displayName));
        })
        .catch((e) => {
          console.log(e);
        });
    };
  };

export const LoginSincrono = (id, displayname) => {
  return {
    type: types.Login,
    payload: {
      id,
      displayname,
    },
  };
};

//Logout
export const logout = () => {
  return (dispatch) => {
    const auth = getAuth();
    signOut(auth)
      .then((user) => {
        dispatch(logoutSincrono());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const logoutSincrono = () => {
  return {
    type: types.Logout,
  };
};


//Crear usuario


export const RegistroEmailPassword = (email, password, name) => {
  return(dispatch) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth,email,password)
      .then(async ({user}) => {
         await updateProfile(auth.currentUser, {displayName: name})
         dispatch(registerSincrono(user.email,user.uid,user.displayName))
          console.log(user);
      })
      .catch(e =>{
          console.log(e);
      })
  }
}

export const registerSincrono = (email,password,name) => {

  return{
     type: types.register,
     payload: {
         email,
         password,
         name
     }
  }
}

