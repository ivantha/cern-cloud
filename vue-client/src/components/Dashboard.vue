<template>
  <div class="container">
    <div class="upload-container">
    </div>
    <div class="file-container">
      <b-table hover :items="fileListTableItems" :fields="fileListTableFields"></b-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
    },
    onFileUpload (uFileList) {
      var newURL = URL.createObjectURL(uFileList[0])
      newURL = newURL.substring(5, newURL.length)
      console.log(newURL)
      axios({
        method: 'put',
        url: 'http://localhost:80/remote.php/webdav/' + uFileList[0].name,
        data: {
          username: 'ivantha',
          password: 'cat',
          content: newURL
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 5%;
  }
  .upload-container{
    margin-bottom: 50px;
  }
</style>
