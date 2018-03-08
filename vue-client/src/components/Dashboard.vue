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
    async fetchFiles () {
      axios
        .get('http://localhost:7000/files/all')
        .then(res => {
          this.$data.fileListTableItems = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.container {
  margin: 5%;
}
.upload-container {
  margin-bottom: 50px;
}
</style>
