new Vue({
  el: '#store',
  data: () => {
    return {
      'data':{},
      'idProduct': 0,
      'actif': true
    }
  },
  created: function () {
    let self = this
    const urlParams = new URLSearchParams(window.location.search)
    this.idProduct = urlParams.get('prodId')
    axios.get('/api/supportedLanguage', {params: {name: this.name}})
      .then(function (res) {
        res.data.forEach(value => {
          // self.$set('data[' + value + ']', {name:'', desc:''})
          Vue.set(self.data, value, {name:'', desc:''})
        })
        axios.get('/api/products/'+ self.idProduct, {params: {name: self.name}})
          .then(function (res) {
            console.log(res.data)
            self.idProduct = res.data._id
            self.actif = res.data.actif
            Object.keys(res.data.language).forEach(key => {
              self.data[key].name = res.data.language[key].name
              self.data[key].desc = res.data.language[key].desc
            })

          })
      })

  },
  methods: {
    newProduct: function (el) {
      axios.patch('/api/product', {'id': this.idProduct,'actif': this.actif,'languages': this.data})
        .then(function (response) {
          //window.location.href = '/index.html'
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      el.preventDefault()
    },
  }
})