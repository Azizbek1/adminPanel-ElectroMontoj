import store from ".";

const { dispatch } = store;

// this function are useful for dispach store (instead of useDispatch)
export const setIsAuth = (payload: string) => {
  dispatch({ type: "userLogin/setIsAuth", payload });
};
export const setIsStatus = (payload: boolean) => {
  dispatch({ type: "userLogin/setIsStatus", payload });
};

export const setIsNetworkErr = (payload: boolean) => {
  dispatch({ type: "userLogin/setIsNetworkErr", payload });
};
