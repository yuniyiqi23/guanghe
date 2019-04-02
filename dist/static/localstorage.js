import $ from 'jquery'
function local() {
  let getToken = this.$qs.stringify({
    name:"gh_sunwh",
    password:"111111"
  });
  $.post("http://47.75.8.64:3002/user/signin", getToken)
    .then((res)=>{
      console.log(res.data)
    })
}
