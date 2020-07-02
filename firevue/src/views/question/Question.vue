<template>
  <div class="container">
    <form>
      <input type="text" placeholder="검색어" />
      <input type="submit" value="검색" />
    </form>
    <table>
      <tr>
        <th scope="cols">타이틀</th>
        <th scope="cols">내용</th>
        <th scope="cols">글쓴이</th>
        <th scope="cols">작성일</th>
      </tr>
      <tr v-for="item in listItem" :key="item._id">
        <td>
          <router-link :to="'/question/'+item._id">{{item.title}}</router-link>
        </td>
        <td>{{item.content.substring(0,4).concat('...')}}</td>
        <td>{{item.writer}}</td>
        <td>{{new Date(item.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</td>
      </tr>
    </table>
    <br />
    <button>글쓰기</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listItem: []
    }
  },
  created() {
    this.$axios("/api/question").then(r => {
      this.listItem = r.data
      console.log(this.listItem)
    })
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
form {
  width: 100%;
}
input {
  border: 1px solid black;
  border-radius: 5px;
}
table {
  border-collapse: collapse;
  width: 90%;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid black;
}
</style>