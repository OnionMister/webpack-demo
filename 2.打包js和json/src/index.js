import data from './data.json'

function fun() {
    alert(`name：${data.name},age:${data.age}`);
    console.log("webpack 打包js");
    alert("webpack 打包js")
}
fun();