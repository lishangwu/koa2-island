// console.log(1/0);

// function sleep(ms){
//     return new Promise(resolve => setTimeout(resolve, ms))
// }

// async function test(){
//     await sleep(1000)
//     console.log('sb');
// }

// test()


var obj = {
    name: "sb",
    pwd: '123',
    // toJSON(){
    //     return 'sb'
    // }
    toJSON: function(){
        return 'sb'
    }
}

console.log(JSON.stringify(obj));