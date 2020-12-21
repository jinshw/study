// export default Beans

require('@babel/polyfill')

class Beans{

}

function * gen(params){
    yield 1;
}

console.log(gen().next())


"aaa".includes('a')
