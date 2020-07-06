<template>
  <div id="container">
    <div class="edit">
      <br />
      <input v-model="title" type="text" placeholder="제목" />
      <br />
      <br />
      <editor
        ref="toastuiEditor"
        class="editor"
        :height="'100%'"
        :initialValue="editorText"
        :options="editorOptions"
        initialEditType="wysiwyg"
        previewStyle="vertical"
      />
      <br />
      <button @click="getHtml">작성</button>
    </div>
  </div>
</template>

<script>
import "codemirror/lib/codemirror.css"
import "@toast-ui/editor/dist/toastui-editor.css"

import { Editor } from "@toast-ui/vue-editor"
export default {
  components: {
    editor: Editor
  },
  data() {
    return {
      title: "",
      content: "",
      writer: "",
      editorText: "This is initialValue.",
      editorOptions: {
        hideModeSwitch: true
      }
    }
  },
  methods: {
    getHtml() {
      this.content = this.$refs.toastuiEditor.invoke("getHtml")
      this.writer = this.$store.state.user.id
      this.$axios
        .post("/api/question/createQuestion", {
          title: this.title,
          content: this.content,
          writer: this.writer
        })
        .then(r => {
          console.log(r)
          this.$router.push("/question")
        })
        .catch(e => {
          alert(e)
        })
    }
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 80%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

#container .edit {
  width: 80%;
}

#container .edit .editor {
  border: 1px solid black;
}

#container .edit input {
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
}
#container .edit button {
  font-size: 25px;
  font-weight: 450;
}

#container .edit button:hover {
  border-radius: 5px;
  background-color: darkgrey;
}
</style>