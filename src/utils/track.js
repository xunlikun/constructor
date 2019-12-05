import store from '@/store'
export default {
      loading(target, name, descriptor) {
          var oldValue = descriptor.value;
        
          descriptor.value = async function() {
            store.commit('SET_GLOADING',true)
            await oldValue.apply(this, arguments);
            store.commit('SET_GLOADING',false)
          };
        
          return descriptor;
      }
  }