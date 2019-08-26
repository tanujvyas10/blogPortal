// let blogs=$('.comments')
// let str=[]
// for(let j=0;j<blogs.length;j++) {
//     $.ajax({
//         url: '/getcomments',
//         type: 'get',
//         success: (data) => {
//             for(let i=0;i<data.length;i++) {
//                 // alert(data[i].blogTitle)
//                 if(data[i].blogTitle == blogs[j].id) {
//                     str=str + `<li>${data[i].by}: ${data[i].comment} likes: ${data[i].likes} <button class="clike" id="${data[i].comment}">Like</button></li>`
//                     // blogs[j].append(`${data[i].by}: ${data[i].comment} likes: ${data[i].likes} <br>`)
//                 }
//                 blogs[j].innerHTML=str
//             }
//             str=[]
//         }
//     })
// }

let blogs=$('.comments')
let str=[]
$.ajax({
    url: '/getcomments',
    type: 'get',
    success: (data) => {
        for(let i=0;i<data.length;i++) {
            if(data[i].blogTitle == blogs[0].id) {
                str=str + `<li><b> ${data[i].by}:</b> ${data[i].comment}  <button class="clike btn btn-light" id="${data[i].comment}">${data[i].likes} Upvote</button></li>`
                //<img src="${data[i].dp}" alt="dp" width="50px" style="border-radius: 30px;"> -----for dp in comment
            }
            blogs[0].innerHTML=str
        }
        str=[]
    }
})

$('ul').click((e) => {
    let title=e.target.id
    $.ajax({
        url: '/like/' + title,
        type: 'post',
        success: () => {
            window.location.reload()
            console.log('ok');
            
        }
    })
})

$('#like').click((e) => {
    let title=e.target.parentElement.innerText
    title=title.slice(0, title.length-2)
    console.log(title);
    
    $.ajax({
        url: '/addlike/' + title,
        type: 'post',
        success: () => {
            window.location.reload()
        }
    })
})

$('#search').keyup((e) => {
    $.ajax({
        url: `/search?q=${e.target.value}`,
        type: 'get',
        success: (data) => {
            $('#sugg').html('')
            for(let i=0;i<data.length;i++){
                $('#sugg').append(`<p><a href="/blog?title=${data[i].title}">${data[i].title}</a></p>`)
            }
        }
    })
})