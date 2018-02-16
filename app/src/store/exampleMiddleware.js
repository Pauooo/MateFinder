/*
 * Middleware
 */
export default store => next => (action) => {
  // Code
  console.log(store.getState());

  // On passe au voisin
  next(action);
};
