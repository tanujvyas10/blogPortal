const express=require('express')
const svr=express()
const session=require('express-session')
const passport=require('./stratergies')
const { connectdb }=require('./db')

svr.set('view engine', 'hbs')
svr.use('/', express.static(__dirname + '/public'))
svr.use(express.urlencoded({extended: true}))
svr.use(express.json())

svr.use(session({
    secret: 'kamehameha',
    resave: false,
    saveUninitialized: true,
}))

svr.use(passport.initialize())
svr.use(passport.session())

function checkLogin(req, res, next) {
    if(req.user) {
        return next()
    }
    else {
        res.send('<h1>Error 403</h1><h3>Login First!!<h3>')
    }
}

svr.get('/all', (req, res) => {
    connectdb('blogportal')
        .then(db => db.collection('blogs').find().limit(12).sort({likes: -1}))
        .then(blogs => blogs.toArray())
        .then((blogs) => {
            res.render('all', {blogs})
        })
})

svr.get('/next/:skp', (req, res) => {
    let s=parseInt(req.params.skp, 10)
    connectdb('blogportal')
        .then(db => db.collection('blogs').find().skip(s).limit(12).sort({likes: -1}))
        .then(blogs => blogs.toArray())
        .then(blogs => res.send(blogs))
        .catch(err => res.send(err))
})

svr.get('/', (req, res) => {
    connectdb('blogportal')
        .then(db => db.collection('blogs').find().limit(8).sort({likes: -1}))
        .then(blogs => blogs.toArray())
        .then((blogs) => {
            res.render('home', {blogs})
        })
})

svr.get('/home', checkLogin, (req, res) => {
    let user=req.user[0].username
    let dp=req.user[0].dp
    connectdb('blogportal')
        .then(db => db.collection('blogs').find().limit(8).sort({likes: -1}))
        .then(blogs => blogs.toArray())
        .then((blogs) => {
            res.render('home', {user, dp, blogs})
        })
})

svr.get('/signup', (req, res) => {
    res.render('signup')
})

svr.post('/signup', (req, res) => {
    let nuser = {
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dp: (req.body.dp) ? req.body.dp : 'https://i.imgur.com/iDYfrOd.png'
    }
    connectdb('blogportal')
        .then(db => db.collection('users').insertOne(nuser))
        .then(() => res.redirect('/'))
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})

svr.get('/signin', (req, res) => {
    res.render('signin')
})

svr.post('/signin', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/signin'
}))

svr.get('/signin/facebook', passport.authenticate('facebook', { scope : ['email'] }))

svr.get('/signin/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/signin/facebook'
}))

svr.get('/signin/google', passport.authenticate('google', {scope: ['profile', 'email']}))

svr.get('/signin/google/callback', passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/signin/google'
}))

svr.get('/signout', (req, res) => {
    req.logout()
    res.redirect('/')
})

svr.get('/createb', checkLogin, (req, res) => {
    res.sendFile(__dirname + '/public/newBlog.html')
})

svr.post('/create', checkLogin, (req, res) => {
    let date=new Date()
    let blog = {
        title: req.body.title,
        author: req.user[0].username,
        date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
        body: req.body.body,
        likes: 0,
        coverimg: req.body.coverimg,
        dp: req.user[0].dp,
        category: req.body.category
    }
    connectdb('blogportal')
        .then(db => db.collection('blogs').insertOne(blog))
        .then((blog) => {
            console.log(blog)
            res.redirect('/myBlogs')
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
})

svr.get('/myBlogs', checkLogin, (req, res) => {
    let dp=req.user[0].dp
    let name=req.user[0].username
    const myBlogs = () => connectdb('blogportal')
        .then(db => db.collection('blogs').find({ $and: [ {author: name}, {dp: dp} ]}).sort({likes: -1}))
        .then(blogs => blogs.toArray())
        .then((blogs) => res.render('myblogs', {blogs}))
    myBlogs()
})

svr.delete('/deleteBlog/:title', checkLogin, (req, res) => {
    connectdb('blogportal')
        .then(db => db.collection('blogs').deleteOne({ title: req.params.title }))
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
})

svr.post('/editBlog', checkLogin, (req, res) => {
    connectdb('blogportal')
        .then(db => db.collection('blogs').updateOne({ title: req.body.title}, { $set: {body: req.body.body, coverimg: req.body.coverimg, category: req.body.category} }))
        .then(() => res.redirect('/myBlogs'))
})

svr.get('/blog', (req, res) => {
    connectdb('blogportal')
        .then(db => db.collection('blogs').find({ title: req.query.title }))
        .then(blog => blog.toArray())
        .then((blog) => {
            let content=blog[0].body.split('--newpara--')
            let bb={
                one: blog,
                two: content
            }
            res.render('oneblog', {bb}
        )})
})

svr.get('/getcomments', (req, res) => {
    connectdb('blogportal')
        .then(db => db.collection('comments').find())
        .then((comments => comments.toArray()))
        .then((comments => res.send(comments)))
})

svr.post('/addcomment', checkLogin, (req, res) => {
    let cmnt = {
        blogTitle: req.body.title,
        blogAuthor: req.body.author,
        by: req.user[0].username,
        comment: req.body.comment,
        dp: req.body.dp,
        likes: 0
    }
    const newcomment = (comment) => connectdb('blogportal')
        .then(db => db.collection('comments').insertOne(comment))
        .then(() => res.redirect('back'))
    newcomment(cmnt)
})

svr.post('/like/:title', checkLogin, (req, res) => {
    connectdb('blogportal')
        .then(db => db.collection('comments').updateOne({ comment: req.params.title }, { $inc: {likes: 1} }))
        .then(() => res.redirect('/home'))
})

svr.post('/addlike/:title', checkLogin, (req, res) => {
    connectdb('blogportal')
        .then(db => db.collection('blogs').updateOne({ title: req.params.title}, { $inc: {likes: 1} }))
        .then(() => res.redirect('/home'))
})

svr.get('/search', (req, res) => {
    connectdb('blogportal')
        // .then(db => db.collection('blogs').find({ $text: { $search: req.query.q } }, { score: { $meta: "textScore" } } ).sort( { score: { $meta: "textScore" } } ))
        .then(db => db.collection('blogs').find({ $text: { $search: req.query.q } } ))
        .then(titles => titles.toArray())
        .then(titles => {
            res.send(titles)
        })
        .catch((e) => res.send(e))
})

svr.get("/category", (req, res) => {
    connectdb('blogportal')
        .then(db => db.collection('blogs').find({category: req.query.cat}))
        .then(blogs => blogs.toArray())
        .then(blogs => res.render('blogs', {blogs}))
})

svr.listen(3000, () => {
    console.log('http://localhost:3000/')
})