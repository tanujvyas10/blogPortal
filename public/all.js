$('#previous').hide()

$('#search').keyup((e) => {
    $.ajax({
        url: `/search?q=${e.target.value}`,
        type: 'get',
        success: (data) => {
            $('#sugg').html('')
            for(let i=0;i<data.length;i++){
                $('#sugg').append(`<a href="/blog?title=${data[i].title}">${data[i].title}</a><br>`)
            }
        }
    })
})

let count=12

$('#next').click((e) => {
    console.log(count)
    $.ajax({
        url: '/next/' + count,
        type: 'get',
        success: (data) => {
            if(data.length !== 0){
                let write=[]
                for(let i=0;i<data.length;i++){
                    write+=`<div class="col-xl-3 col-md-5 col-sm-10">
                                <div class="card border shadow" style="margin-bottom: 10px;">
                                <img src="${data[i].coverimg}" class="card-img-top" alt="coverimage">
                                <img src="${data[i].dp}" class="dp shadow" alt="profile img" width="75px">
                                <h5 class="card-subtitle text-muted mb-2 text-center"><b>Category:</b> ${data[i].category}</h5>
                                <div class="card-body">
                                <div id="matter" class="text-center">
                                    <a href="/blog?title=${data[i].title}" class="btn btn-dark"><h3 class="card-title">${data[i].title}</h3></a>
                                </div>
                                <div class="card-text text-center">
                                <b>Author:</b> ${data[i].author} <br> <b>Created:</b> ${data[i].date} <br> <b>Likes 👍:</b> <span>${data[i].likes}</span>
                                </div>
                                </div>
                                </div>
                            </div>`
                    $('.row').html(write)
                }
                count+=12
                if(count >= 24){
                    $('#previous').show()
                }
            }
            else{
                console.log('no data');
            }
        }
    })
})

$('#previous').click((e) => {
    console.log(count)
    if(count >= 24){
        let skp=count-24
        $.ajax({
            url: '/next/' + skp,
            type: 'get',
            success: (data) => {
                if(data.length !== 0){
                    let writep=[]
                    for(let i=0;i<data.length;i++){
                        writep+=`<div class="col-xl-3 col-md-5 col-sm-10">
                                <div class="card border shadow" style="margin-bottom: 10px;">
                                <img src="${data[i].coverimg}" class="card-img-top" alt="coverimage">
                                <img src="${data[i].dp}" class="dp shadow" alt="profile img" width="75px">
                                <h5 class="card-subtitle text-muted mb-2 text-center"><b>Category:</b> ${data[i].category}</h5>
                                <div class="card-body">
                                <div id="matter" class="text-center">
                                    <a href="/blog?title=${data[i].title}" class="btn btn-dark"><h3 class="card-title">${data[i].title}</h3></a>
                                </div>
                                <div class="card-text text-center">
                                <b>Author:</b> ${data[i].author} <br> <b>Created:</b> ${data[i].date} <br> <b>Likes 👍:</b> <span>${data[i].likes}</span>
                                </div>
                                </div>
                                </div>
                            </div>`
                        $('.row').html(writep)
                        if(count <= 24){
                            $('#previous').hide()
                        }
                    }
                    count-=12
                    console.log(count)
                }
                else{
                    console.log('no data');
                }
            }
        })
    }
    else{
        console.log('no data')
    }
})