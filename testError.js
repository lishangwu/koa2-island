const Koa = require('koa')

const app = new Koa()


app.use(async(ctx, next)=>{
    try{
        await next()
    }catch(e){
        console.log('e..', e.message);
        ctx.body += '..error....................' + e.message
    }
})
app.use(async(ctx, next)=>{
    console.log('a..1');
    ctx.body = 'a'
    await next()
    console.log('a..2');
})
app.use(async(ctx, next)=>{
    console.log('b..1');
    ctx.body += 'b'
    // throw new Error('this is a error..')
    a
    await next()
    console.log('b..2');
})
app.use(async(ctx, next)=>{
    console.log('c..1');
    ctx.body += 'c'
})

app.listen(3000)