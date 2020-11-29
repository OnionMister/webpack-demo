// 导入样式
import './index.less';
const bgImg = require('./imgs/small.jpg');

function test() {
    console.log("webpack打包图片资源");
}
test();
var bg4 = document.getElementsByClassName("bg4")[0];
bg4.style.backgroundImage = `url(${bgImg})`;