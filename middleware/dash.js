export default function(context){
  console.log("[middleware] Just Auth")
  if(context.store.getters.isAuthenticated){
    context.redirect('/');
  }
};
