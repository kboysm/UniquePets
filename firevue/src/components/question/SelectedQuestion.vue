<template>
  <div class="container">
    <div id="selectedQuestion">
      <h2>{{selectedQuestion.title}}</h2>
      <pre>

작성자 {{selectedQuestion.writer}}  {{new Date(selectedQuestion.createdAt).toLocaleDateString(undefined,options)}}</pre>
      <br />
      <hr />
      <div class="content">
        <br />
        <p v-html="selectedQuestion.content"></p>
        <br />
        <br />
        <hr />
        <button v-if="selectedQuestion.writer == $store.state.user.id" @click="modal=!modal">게시글 수정</button>
        <br />
        <button
          v-if="selectedQuestion.writer == $store.state.user.id"
          @click="deleteQuestion"
        >게시글 삭제</button>
      </div>
      <br />
      <div id="comments">
        <h3>덧글목록</h3>

        <v-list-item v-for="item in selectedQuestion.comments" :key="item._id" two-line>
          <v-list-item-content>
            <v-list-item-title>{{item.content}}</v-list-item-title>
            <v-list-item-subtitle>{{item.author}}.{{new Date(item.comment_date).toLocaleDateString(undefined, options)}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <div>
          <form>
            <label>{{userId }}</label>
            <input hidden="hidden" />
            <input
              v-model="comment"
              @keypress.enter="submitEnter"
              style="border:1px solid black; border-radius:5px;"
              type="text"
            />

            <!-- <input type="submit" value="제출" /> -->
          </form>
        </div>
      </div>
    </div>
    <div v-if="modal" id="myModal" class="modal">
      <span @click="modal=!modal" class="close">&times;</span>
      <div id="Editcontainer">
        <div class="edit">
          <br />
          <input v-model="selectedQuestion.title" type="text" placeholder="제목" />
          <br />
          <br />
          <editor
            ref="toastuiEditor"
            class="editor"
            :height="'100%'"
            :initialValue="selectedQuestion.content"
            :options="editorOptions"
            initialEditType="wysiwyg"
            previewStyle="vertical"
          />
          <br />
          <button @click="updateQuestion">수정</button>
        </div>
      </div>
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
      modal: false,
      comment: "",
      selectedQuestion: {},
      options: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      },
      _id: "",

      editorOptions: {
        hideModeSwitch: true
      }
    }
  },
  methods: {
    deleteQuestion() {
      this.$axios
        .post("/api/question/delete", { _id: this.selectedQuestion._id })
        .then(r => {
          this.$router.push("/question")
        })
    },
    scroll() {
      this.$refs.toastuiEditor.invoke("scrollTop", 10)
    },
    moveTop() {
      this.$refs.toastuiEditor.invoke("moveCursorToStart")
    },
    updateQuestion() {
      this.selectedQuestion.updatedAt = String(new Date())
      this.selectedQuestion.content = this.$refs.toastuiEditor.invoke("getHtml")
      this.$axios
        .post("/api/question/update", this.selectedQuestion)
        .then(r => {
          this.selectedQuestion = r.data
          this.modal = false
        })
    },
    submitEnter() {
      if (!this.$store.state.token) {
        this.$router.push("/login")
        return
      } else {
        this.$axios
          .post("/api/question/comment/writer", {
            _id: this._id,
            comment: this.comment,
            // author: this.$store.state.user.id
            author: this.userId
          })
          .then(r => {
            this.selectedQuestion.comments = r.data
          })
          .catch(e => {
            console.error(e)
          })
      }
    }
  },
  computed: {
    userId() {
      const userName = localStorage.getItem("user")

      return userName ? JSON.parse(localStorage.getItem("user")).id : "비로그인"
    }
  },
  created() {
    this._id = this.$route.params.SelectedQuestion
    this.$axios(`/api/question/${this.$route.params.SelectedQuestion}`).then(
      r => {
        this.selectedQuestion = r.data
      }
    )
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
}
#selectedQuestion {
  background: #fff;
  border-radius: 5px;
  width: 65vw;
  height: auto;
  text-align: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  opacity: 0.8;
  padding: 24px;
  .options button {
    border: 1px;
    color: red;
  }
}
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
}
#Editcontainer {
  width: 100%;
  height: 80%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

#Editcontainer .edit {
  width: 80%;
}

#Editcontainer .edit .editor {
  border: 1px solid black;
}

#Editcontainer .edit input {
  border: 1px solid black;
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
}
#Editcontainer .edit button {
  font-size: 25px;
  font-weight: 450;
  color: #fff;
}

#Editcontainer .edit button:hover {
  border-radius: 5px;
  background-color: darkgrey;
}
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}
</style>