Vue.component('plat', {
  props: ['actif', 'language', 'idproduct'],
  template: `
    <div class="container col-sm-4" style="background-color: #ceceff;border-radius: .25rem;margin: 25px">
      <div class="" style="width: 18rem;">
<table class="table">
  <thead>
    <tr>
      <th scope="col">Language</th>
      <th scope="col">Nom</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody v-for="(info, value) in language">
    <tr>
      <th scope="row">{{value}}</th>
      <td>{{info.name}}</td>
      <td>{{info.desc}}</td>
    </tr>
  </tbody>
</table>
        <input type="checkbox" name="actif" value="actif" v-model="actif" disabled="disabled">actif<br>
<form action="/edit.html">
    <input id="prodId" name="prodId" type="hidden" v-bind:value="idproduct">
    <input type="submit" value="Edit" class="btn btn-primary"/>
</form>
      </div>
    </div>
    `
})

new Vue({
  el: '#store',
  data: () => {
    return {
      'plats': [],
      'name': ''
    }
  },
  created: function () {
  },
  methods: {
    newProduct: function (el) {
    },
    search: function (el) {
      this.plats.splice(0, this.plats.length)
      let self = this
      axios.get('/api/searchProduct', {params: {name: this.name}})
        .then(function (res) {
          console.log(res)
          self.plats.push(...res.data)
        })
    }
  }
})