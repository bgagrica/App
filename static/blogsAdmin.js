let selected = 0
let cookies = document.cookie.split('=');
let   token = cookies[cookies.length - 1];
function init(){
    cookies = document.cookie.split('=');
    token = cookies[cookies.length - 1];
    // headers: {
    //     'Authorization': `Bearer ${token}`
    // }
       
    fetch('https://branko-rest.herokuapp.com/admin/allBlogs', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then( res => res.json() )
    .then( data => {
        const lst = document.getElementById('blogLst');

        data.forEach( el => {
            let btDel = '<button type="submit" value="Submit" class="delBtn" id="${el.id}" onclick="deleteBlog(this)">Delete</button>'
            let btSel = '<button type="submit" value="Submit" class="selBtn" id="${el.id}" onclick="selectBlog(this)">Select</button>'
            lst.innerHTML +=  `<tr> <td>${el.id}</td> <td>${el.userId}</td> <td>${el.name} </td> <td>${el.category}</td> <td>${btSel}</td> <td>${btDel}</td> </tr>`;
        });
    });

    document.getElementById('submitBtn').addEventListener('click', e => {
        e.preventDefault();
        if(selected===0)return
        let name = document.getElementById('name').value
        let category = document.getElementById('category').value
        let blogBody= document.getElementById('blogBody').value
      
        const data = {
            id: selected,
            name: name,
            category: category,
            body: blogBody,
           

        };

        fetch('https://branko-rest.herokuapp.com/admin/blogs/'+selected, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(data)
                })
                .then( res => res.json() )
               
        location.reload();
    });



}

function deleteBlog(row){
    var d = row.parentNode.parentNode.rowIndex;
    let obj = row.parentNode.parentNode
    var html= obj.getElementsByTagName('td')[0].innerHTML;// or $('div').html() if jquery
    var number = parseFloat(html.match(/-*[0-9]+/));  
    console.log(number)  
   
     document.getElementById('blogLst').deleteRow(d);
     const data = {
        id: number,
     }
    
            let path = 'https://branko-rest.herokuapp.com/admin/blogs/' + number
        fetch(path, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`},
            body: JSON.stringify(data)
          })
          .then(res => res.json()) // or res.json()
          .catch( err => console.log("err") );

}

function selectBlog(row){

    var d = row.parentNode.parentNode.rowIndex;
    let obj = row.parentNode.parentNode
    var html= obj.getElementsByTagName('td')[0].innerHTML;// or $('div').html() if jquery
    var number = parseFloat(html.match(/-*[0-9]+/));  
    console.log(number)
    selected=number




    fetch('https://branko-rest.herokuapp.com/blogs/'+number, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then( res => res.json() )
    .then( data => {
        const name = document.getElementById('name')
        const category = document.getElementById('category')
        const blogBody = document.getElementById('blogBody')


        name.value = data.name
        category.value = data.category
        blogBody.value = data.body
       
       
    });

    fetch('https://branko-rest.herokuapp.com/admin/comments/'+number, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then( res => res.json() )
    .then( data => {
        
        const lst = document.getElementById('commentLst');

        data.forEach( el => {
            let btDel = '<button type="submit" value="Submit" class="delBtn" onclick="deleteComment(this)">Delete</button>'
            console.log(el)
            lst.innerHTML +=  `<tr> <td>${el.id}</td> <td>${el.blogId}</td> <td>${el.name} </td>  <td>${el.likes}</td> <td>${el.dislikes}</td> <td>${btDel}</td> </tr>`;
        });
    });
}

function deleteComment(row){
    var d = row.parentNode.parentNode.rowIndex;
    let obj = row.parentNode.parentNode
    var html= obj.getElementsByTagName('td')[0].innerHTML;// or $('div').html() if jquery
    var number = parseFloat(html.match(/-*[0-9]+/));  
    console.log(number)  
   
     document.getElementById('commentLst').deleteRow(d);
     const data = {
        id: number,
     }
    
            let path = 'https://branko-rest.herokuapp.com/admin/comments/' + number
        fetch(path, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`},
            body: JSON.stringify(data)
          })
          .then(res => res.json()) // or res.json()
          .catch( err => console.log("err") );

}