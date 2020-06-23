<template>
  <div id="noticeList">
    <table class="type09">
      <thead>
        <tr>
          <th colspan="4">
            <h2>공지사항</h2>
          </th>
        </tr>
        <tr>
          <th scope="cols">타이틀</th>
          <th scope="cols">내용</th>
          <th scope="cols">글쓴이</th>
          <th scope="cols">작성일</th>
        </tr>
      </thead>
      <tbody id="data-container">
        <!-- <tr v-for="(item,i) in 10" :key="item._id">
          <th scope="row">
            <a href="#">{{noticeList[i].title}}</a>
          </th>
          <td>{{noticeList[i].content.substring(0,17).concat('..')}}</td>
          <td>{{noticeList[i].writer}}</td>
          <td>{{noticeList[i].createdAt.substring(0,10)}}</td>
        </tr>-->
      </tbody>
    </table>
    <div id="pagination"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      noticeList: []
    };
  },
  methods: {
    selectedNoticeAxios() {
      console.log("selected");
    }
  },
  created() {
    this.$axios("/api/notice")
      .then(r => {
        this.pageLength = r.data.length / this.pageUnit;
        this.noticeList = r.data;
        return this.noticeList;
      })
      .then(r => {
        let container = $("#pagination");
        container.pagination({
          dataSource: r,
          callback: function(data, pagination) {
            var dataHtml = "<tr>";

            $.each(data, function(index, item) {
              (dataHtml +=
                "<th scope='row'><a href='/notice/" +
                item._id +
                "'>" +
                item.title +
                "</a></th>"),
                (dataHtml +=
                  "<td>" +
                  item.content.substring(0, 17).concat("..") +
                  "</td>"),
                (dataHtml += "<td>" + item.writer + "</td>"),
                (dataHtml +=
                  "<td>" + item.createdAt.substring(0, 10) + "</td></tr>");
            });

            $("#data-container").html(dataHtml);
          }
        });
      })

      .catch(e => {
        console.error(e);
      });
  }
};
</script>
<style scoped>
#noticeList {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  margin-top: 12px;
}
#pagination {
  background: #fff;
  border-radius: 5px;
  width: 65vw;
  text-align: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  opacity: 0.8;
  padding: 24px;
}

table.type09 {
  background: #fff;
  border-radius: 5px;
  width: 65vw;
  height: 65vh;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  opacity: 0.8;
  padding: 24px;

  border-collapse: collapse;
  line-height: 1.5;
}
table.type09 thead th {
  padding: 10px;
  text-align: center;
  font-weight: bold;
  vertical-align: top;
  color: #369;
  border-bottom: 3px solid #036;
}

table.type09 tbody th {
  width: 350px;
  padding: 10px;
  font-weight: bold;
  vertical-align: top;
  border-bottom: 1px solid #ccc;
  background: #f3f6f7;
  text-align: center;
}
table.type09 td {
  text-align: center;
  width: 150px;
  padding: 10px;
  vertical-align: top;
  border-bottom: 1px solid #ccc;
}
</style>