// ----------------------------------------------------------------
import str from './source'
console.log(str.default)
if(module.hot){
    module.hot.accept('./source',() => {
        let str = require('./source');
        console.log(str.default)
    })
}

// // 懒加载
// let button = document.createElement('button');
// button.innerHTML = "懒加载"
// button.addEventListener('click',function(){
//     // es6中草案中的语法，jsonp实现动态加载文件
//     import('./source.js').then(data => {
//         console.log(data.default);
//     })
// })
// document.body.appendChild(button);
// ----------------------------------------------------------------
// import $ from 'jquery'
// console.log($)
// ----------------------------------------------------------------
// import './aa'
// import './bb'
// console.log("other......")
// ----------------------------------------------------------------
// import {sum,minus} from './test.js';

// console.log(calc.sum(1,2))

// let a = 1;
// let b = 2;
// let c = 3;
// console.log(a+b+c,"-------------------------")

// ----------------------------------------------------------------
// import React from 'react';
// import { render } from 'react-dom';
// render(<h1>jsx</h1>,window.root)

// ----------------------------------------------------------------
// import moment from 'moment'
// // 设置语言
// // moment.locale('zh-cn')
// // 手动引入所需语言
// import 'moment/locale/zh-cn'

// let r = moment().endOf('day').fromNow()
// console.log(r)

// ----------------------------------------------------------------
// import $ from 'jquery'
// ----------------------------------------------------------------
// let url= ""
// if(DEV === 'dev'){
//     url = "http://localhost:3000"
// }else{
//     url = "http://www.chtgeo.com"
// }
// console.log(url,",--------------------------------")
// console.log(FLAG,typeof FLAG)
// console.log("EXPRESSION==",EXPRESSION)
// ----------------------------------------------------------------
// resolve
// import './style'
// import "bootstrap/dist/css/bootstrap.css"

// ----------------------------------------------------------------
// 代理
// let xhr = new XMLHttpRequest();
// xhr.open('GET',"/user",true)

// xhr.onload =function(){
//     console.log(xhr.response)
// }

// xhr.send();

// ----------------------------------------------------------------
// 3.14 配置source-map
// console.log("source-map .... 7")



// ----------------------------------------------------------------
// 3.11.1 在JS中创建图片来引入
// import logo from './logo.png'
// let image = new Image();
// image.src = logo;
// document.body.appendChild(image);


// ----------------------------------------------------------------

// import $ from 'jquery'

// import $ from "expose-loader?exposes[]=$&exposes[]=jQuery!jquery";
// console.log($)
// console.log(window.$)
// console.log("-------------------------------")

// require("./index.css")
// require("./index.less")

// let str = require("./a.js")
// ----------------------------------------------------------------
// let fn = () => {
//     console.log("fn....")
// }
// fn();

// var abc = "abc"

// ----------------------------------------------------------------
// @log
// class Person{
//     name = "John"
// }
// let p = new Person()
// console.log(p.name)

// ----------------------------------------------------------------
// function log(target){
//     console.log(target)
// }




