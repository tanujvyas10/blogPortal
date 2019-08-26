let edit=$('.edit')
let del=$('.del')

del.click( (e) => {
    let title=e.target.parentElement.id
    $.ajax({
        url: '/deleteBlog/' + title,
        type: 'delete',
        success: () => {
            window.location.reload()
        }
    })
})

edit.click((e) => {
    let title=e.target.parentElement.id
    console.log(e.target.parentElement.id);
    let edititems=`<form action="/editBlog" method="post">
        <label for="title" style="display: none;">Title</label> <input type="text" name="title" id="title" style="display: none;"> <br>
        <label for="body">Content</label> <textarea name="body" rows=22 style="width: 100%;">write '--newpara--' to create new para</textarea> <br>
        <label for="category">Category</label> <select name="category">
        <option value="music">Music</option>
        <option value="fashion">Fashion & Beauty</option>
        <option value="realEstate">Real Estate</option>
        <option value="travel">Travel</option>
        <option value="food">Food</option>
        <option value="wedding">Wedding</option>
        <option value="movie">Movie</option>
        <option value="comics">Comics</option>
        <option value="photography">Photography</option>
        <option value="law">Law</option>
        <option value="health">Health</option>
        <option value="environment">Environment</option>
        <option value="technology">Technology</option>
        <option value="marketing">Marketing</option>
        <option value="lifestyle">Lifestyle</option>
        <option value="education">Education</option>
        <option value="animals">Animals</option>
        <option value="sports">Sports</option>
        <option value="political">Political</option>
        </select>
        <label for="coverimg">Cover Photo</label> <input type="text" name="coverimg"> <br> <br>
        <button class="btn">Update</button> <a class="btn" href="/myBlogs">Cancel</a>
    </form>`
    e.target.parentElement.innerHTML=edititems
    $('#title').val(title)
})