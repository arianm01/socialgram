export default function(context){
  console.log("[middleware] Just Auth")
  if(!context.store.getters.isAuthenticated){
    console.log("isn't authenticated");
    context.redirect('/auth');
  }else{

  }
};
