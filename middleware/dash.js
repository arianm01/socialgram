export default function(context){
  console.log("[middleware] Just Auth")
  if(context.store.getters.isAuthenticated){
    console.log('is authenticated');
    context.redirect('/');
  }
};
