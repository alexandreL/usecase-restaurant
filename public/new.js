new Vue({
  el: '#store',
  data: () => {
    return {
      'languages': [],
      'data':{},
      'actif': true
    }
  },
  created: function () {
    let self = this
    axios.get('/api/supportedLanguage', {params: {name: this.name}})
      .then(function (res) {
        self.languages.push(...res.data)
        res.data.forEach(value => {
          // self.$set('data[' + value + ']', {name:'', desc:''})
          Vue.set(self.data, value, {name:'', desc:''})
        })

      })

  },
  methods: {
    newProduct: function (el) {
      axios.post('/api/newProduct', {'actif': this.actif,'languages': this.data})
        .then(function (response) {
          window.location.href = '/index.html'
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      el.preventDefault()
    },
  }
})