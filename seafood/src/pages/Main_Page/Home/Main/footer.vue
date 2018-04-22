<template>
  <div class="container">
       <div>
        <p class="title">
            <span>关于</span>
            <span>微博</span>
            <span>微信</span>
            <span>网站</span>
        </p>
        <p>
            <i class="fa fa-weibo ft-weibo"></i>&#x3000;
            <i class="fa fa-weixin ft-weixin"></i>
        </p>
        <p>©2017~2018 ▪ 海鲜超市信息管理系统 ▪ Seafood Supermarket Information Management System ▪ 连斌</p>
       </div>
  </div>
</template>
<style scoped>
.container {
  color: #333;
  text-align: center;
  height: 150px !important;
  background: -webkit-linear-gradient(white, lightblue);
  background: -o-linear-gradient(white, lightblue);
  background: -moz-linear-gradient(white, lightblue);
  background: -mos-linear-gradient(white, lightblue);
  background: linear-gradient(white, lightblue);
}

.container div {
  font-size: 16px;
  color: gray !important;
}

.container div .title {
  display: block;
  width: 250px;
  margin: 15px auto;
  word-spacing: 20px;
  border-bottom: 1px solid gray;
}

.container div i {
  color: black !important;
  font-size: 24px;
}

.container p:nth-child(3) {
  display: block;
  margin-top: 15px;
  font-size: 12px;
}

</style>
