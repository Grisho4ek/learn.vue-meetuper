const customPlugin = {
    install(Vue, options) {
      // 1.add global method or property
      Vue.myGlobalMethod = function() {
        alert('my global method!')
    }

    Vue.myCustomProperty = 'I am custom property'

    // 2. add global asset
    Vue.directive('blue-color', {
      bind(el,binding) {
        el.style.color = 'blue'
      }
    })
    // 3. inject some component options
    Vue.mixin({
      data() {
        return {
          custom_message:' RAAWR'
        }
      },
      created() {
        console.log('custom mixin created');
      },
      methods: {
        scream() {
          alert(this.custom_message)
        }
      }
    })
    // 4. Add an instance method or property
    Vue.prototype.$customMethod = function(){
      alert('I am custom instance method')
    }
  }
}

export default customPlugin