<template>
  <div class="container">
    <table>
      <tr>
        <th scope="cols">타이틀</th>
        <th scope="cols">내용</th>
        <th scope="cols">글쓴이</th>
        <th scope="cols">작성일</th>
      </tr>

      <tr v-for="item in viewItem" :key="item._id">
        <td>
          <router-link :to="'/question/'+item._id">{{item.title}}</router-link>
        </td>
        <td>{{item.content.substring(0,4).concat('...')}}</td>
        <td>{{item.writer}}</td>
        <td>{{new Date(item.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</td>
      </tr>
    </table>
    <br />
    <div class="pagenumbers" id="pagination">
      <button
        @click="pageClickEvent(Number(item.button))"
        :class="item.classState"
        v-for="item in pagination_element"
      >{{item.button}}</button>
    </div>
    <br />
    <router-link to="/createQuestion">글쓰기</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagination_element: [],
      current_page: 1,
      rows: 10,
      listItem: [],
      viewItem: []
    }
  },
  created() {
    this.$axios("/api/question")
      .then(r => {
        this.listItem = r.data
        this.DisplayList(this.listItem, this.rows, this.current_page)
        this.SetupPagination(this.listItem, this.rows)
      })
      .catch(e => {
        alert(e)
      })
  },
  methods: {
    pageClickEvent(page) {
      for (let i = 0; i < this.pagination_element.length; i++) {
        this.pagination_element[i].classState = ""
        if (this.pagination_element[i].button == page) {
          this.pagination_element[i].classState = "active"
        }
      }

      this.current_page = page

      this.DisplayList(this.listItem, this.rows, this.current_page)
    },
    PaginationButton(page, items) {
      let button = { button: page, classState: "" }
      if (this.current_page == page) button.classState = "active"
      return button
    },
    SetupPagination(items, rows_per_page) {
      let page_count = Math.ceil(items.length / rows_per_page)
      for (let i = 1; i < page_count + 1; i++) {
        let btn = this.PaginationButton(i, items)
        this.pagination_element.push(btn)
      }
      console.log(this.pagination_element)
    },
    DisplayList(items, rows_per_page, page) {
      this.viewItem = []
      page--
      let start = rows_per_page * page
      let end = start + rows_per_page
      let paginatedItems = items.slice(start, end)
      for (let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i]
        this.viewItem.push(item)
      }
    }
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
.pagenumbers button {
  width: 30px;
  height: 30px;

  appearance: none;
  border: none;
  outline: none;
  cursor: pointer;

  background-color: #fff;
  font-size: 18px;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
}
.pagenumbers button:hover {
  background-color: #44eeaa;
}
.pagenumbers button.active {
  background-color: #44eeaa;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.2);
}
</style>