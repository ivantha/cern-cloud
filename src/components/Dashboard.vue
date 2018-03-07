<template>
  <div class="container">
    <div>
    </div>
    <div>
      <b-table striped hover :items="fileListTableItems" :fields="fileListTableFields"></b-table>
    </div>
  </div>
</template>

<script>
var Owncloud = require('js-owncloud-client')
var oc = new Owncloud('http://localhost:80')

// Login
oc.login('ivantha', 'cat').then(status => {
  // Login successful
}).catch(error => {
  console.log(error)
})

export default {
  name: 'Dashboard',
  data () {
    return {
      fileListTableFields: [
        {
          key: 'name',
          label: 'Name',
          sortable: false
        },
        {
          key: 'fileInfo.{DAV:}getcontentlength',
          label: 'Size',
          sortable: false
        },
        {
          key: 'fileInfo.{DAV:}getlastmodified',
          label: 'Last Modified',
          sortable: false
        }
      ],
      fileListTableItems: []
    }
  },
  created: function () {
    this.fetchFiles()
  },
  methods: {
    fetchFiles () {
      oc.files.list('/').then(files => {
        files.shift()

        // Remove slash at the begining of the file name
        for (var i = 0; i < files.length; i++) {
          files[i].name = files[i].name.substring(1, files[i].name.length)
        }

        this.$data.fileListTableItems = files
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 5%;
  }
</style>
