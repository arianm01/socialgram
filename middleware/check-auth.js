export default function(context){
    context.store.dispatch('tryLogin', context.req);
}
