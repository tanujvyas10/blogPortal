# BlogPortal

A simple website for creating blogs by loging in via local, google and facebook authentication. Create blogs in a variety of categories provided in the website

## Getting Started

Fork and clone the repository and start the server using 

```
npm start
```

### Prerequisites

Things (npm pakages) you need to install and how to install them

```
express, express-session, hbs, mongodb, passport, passport-facebook, passport-google-oauth20, sequelize', sqlite
```

### Installing

```
npm init
npm install
```


## Built With

* nodejs
* javascript
* jQuery
* css
* bootstrap
* html

## Files

* handlebars files
```
* all.hbs: renders all all existing blogs
* blogs.hbs: renders blogs of a particular category
* home.hbs: renders the homepage
* myblogs: displays blogs of a particular user
* oneblogs: renders a single particular blog
* signin: signin page for local authentication
* signup: signup page for local authentication
```

## Endpoints

* get('/all'): To get all the current blogs in decreasing order of the number of likes
* get('/next/:skp'): To get more blogs in the all section of the homepage where skp gives the no. of blogs to be skipped
* get('/'): Homepage link for logging in
* get('/home'): Personalized homepage for the current logged in user
* post('/signup'): Signup via local authentication
* post('/signin'): Signin via local authentication
* get('/signin/facebook'): Facebook signin page
* get('/signin/facebook/callback'): Callback link for facebook authentication
* get('/signin/google'): Google signin page
* get('/signin/google/callback'): Callback link for google authentication
* get('/signout'): Signout end-point
* get('/createb'): Sends a html form for creating a new blog
* post('/create'): Creates a new blog by writing into the database
* get('/myBlogs'): Sends personal blogs of the user currently logged in
* delete('/deleteBlog/:title'): Deletes a blog from the database where title is the blog's title
* post('/editBlog'): Updates a blog in the database
* get('/blog'): Displays a particular blogs with blog's name in query parameter
* get('/getcomments'): Sends all the comments from the database to an ajax request
* post('/addcomment'): To create a new comment by logged in user
* post('/like/:title'): To upvote a comment with title as the blog's title
* post('/addlike/:title'): To add like to a blog with title as the blog's title
* get('/search'): Sends appropriate blogs to the search bar
* get('/category'): To get all the blogs of a particular category having a query parameter cat containing the category

## Authors

* **Rajat Cambo** - [kaioshin20](https://github.com/kaioshin20)
