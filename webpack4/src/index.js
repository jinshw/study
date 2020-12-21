import $ from 'jquery'

// import $ from "expose-loader?exposes[]=$&exposes[]=jQuery!jquery";
console.log($)
console.log(window.$)
console.log("-------------------------------")

require("./index.css")
require("./index.less")

let str = require("./a.js")
// ----------------------------------------------------------------
let fn = () => {
    console.log("fn....")
}
fn();

var abc = "abc"

// ----------------------------------------------------------------
@log
class Person{
    name = "John"
}
let p = new Person()
console.log(p.name)

// ----------------------------------------------------------------
function log(target){
    console.log(target)
}




