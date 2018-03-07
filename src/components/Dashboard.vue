<template>
  <div class="container">
    <div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
      <el-button size="small" type="primary">Click to upload</el-button>
      <div slot="tip" class="el-upload__tip">Any file less than 513 MB</div>
    </el-upload>
    </div>
    <div>
      <el-table
        v-bind:data="fileListTableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="Name"
          fixed="left"
          align="left">
        </el-table-column>
        <el-table-column
          prop="fileInfo.{DAV:}getcontentlength"
          label="Size"
          width="150"
          fixed="right"
          align="right">
        </el-table-column>
        <el-table-column
          prop="fileInfo.{DAV:}getlastmodified"
          label="Uploaded"
          width="300"
          fixed="right"
          align="left">
        </el-table-column>
      </el-table>
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
      fileListTableData: []
    }
  },
  created: function () {
    this.fetchFiles()
  },
  methods: {
    fetchFiles () {
      // List all files
      oc.files.list('/').then(files => {
        files.shift()
        console.log(files[0].fileInfo)

        // Remove slash at the begining of the file name
        for (var i = 0; i < files.length; i++) {
          files[i].name = files[i].name.substring(1, files[i].name.length)
        }

        this.$data.fileListTableData = files
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .container{
    margin: 5%;
  }
</style>
