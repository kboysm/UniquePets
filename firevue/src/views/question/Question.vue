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
      <tr>
        <td>알비노 팩맨 질문</td>
        <td>구매하려는 ...</td>
        <td>testid0</td>
        <td>{{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</td>
      </tr>
      <tr>
        <td>킹 스네이크 관련</td>
        <td>구매하려는 ...</td>
        <td>testid0</td>
        <td>{{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</td>
      </tr>
      <tr>
        <td>전갈에 물리면 죽나요?</td>
        <td>구매하려는 ...</td>
        <td>testid0</td>
        <td>{{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</td>
      </tr>
      <tr>
        <td>픽시 이빨</td>
        <td>구매하려는 ...</td>
        <td>testid0</td>
        <td>{{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</td>
      </tr>
    </table>
    <br />1 ,2 ,3 ,4 ,5
    <br />
    <button>글쓰기</button>
  </div>
</template>
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