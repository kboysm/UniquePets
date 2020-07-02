<template>
  <article class="userInfo">
    <img src="https://image.flaticon.com/icons/svg/149/149992.svg" alt="userImage" />
    <div class="infoContainer">
      <section>
        이름 : {{$store.state.user.name}}
        <button>수정</button>
      </section>
      <section>
        나이 : {{$store.state.user.age}}
        <button>수정</button>
      </section>
      <section>
        id : {{$store.state.user.id}}
        <button>수정</button>
      </section>
      <button>비밀번호변경</button>
    </div>
  </article>
</template>
<script>
export default {
  name: "MyInfo"
};
</script>
<style scoped>
.userInfo {
  display: flex;
}

.userInfo img {
  border: 1px solid black;
  border-radius: 12px;
}

.userInfo .infoContainer {
  width: 100%;
  padding: 12px;
}

.userInfo .infoContainer section {
  width: 100%;
  background-color: #e2e2e2;
  border-radius: 5px;
  margin: 12px;
}
.userInfo .infoContainer section button {
  float: right;
  color: red;
  margin-right: 3px;
}
</style>