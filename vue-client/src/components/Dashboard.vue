<template>
  <div class="fluid-container">
    <div class="upload-container">
      <form ref='uploadForm'
              id='uploadForm'
              action='http://localhost:7000/files/upload'
              method='post'
              encType="multipart/form-data"
      >
        <input type="file" name="clientFile" aria-label="Select file"/>
        <input type='submit' value='Upload!' aria-label="Upload"/>
      </form>
    </div>
    <div class="file-container">
      <table style="width: 100%">
        <tr>
          <th style="text-align: left">
            Name
          </th>
          <th style="text-align: right">
            Size (KB)
          </th>
          <th>
            Download
          </th>
        </tr>
        <tr :key="file.name" v-for="file in fileListTableItems">
          <td style="text-align: left">
            {{file.name}}
          </td>
          <td style="text-align: right">
            {{file.size}}
          </td>
          <td>
            <button v-on:click="onClickDownload(file.name)">Download</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dashboard',
  data () {
    return {
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
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    onClickDownload (fileName) {
      var url = 'http://localhost:7000/files/download?filename=' + fileName
      window.open(url.replace(' ', '+'))
    }
  }
}
</script>

<style scoped>
  .fluid-container {
    margin-left: 4%;
    margin-right: 4%;
    margin-top: 1%;
    /*background-color: #F6C6CE;*/
  }

  .upload-container {
    margin-bottom: 2%;
  }

  .file-container {
    position: relative;
    display: inline;
  }
</style>
