
    let cookies = document.cookie.split('=');

    let token = cookies[cookies.length - 1];
    let selected = 0;
function init(){
    cookies = document.cookie.split('=');
    token = cookies[cookies.length - 1];
    console.log(token)
    fetch('http://localhost:9000/admin/blogs', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then( res => res.json() )
    .then( data => {
        const lst = document.getElementById('blogLst');

        data.forEach( el => {
            let btDel = '<button type="submit" value="Submit" class="delBtnMod" " onclick="deleteBlog(this)">Delete</button>'
            let btSel = '<button type="submit" value="Submit" class="selBtnMod"  onclick="selectBlog(this)">Select</button>'
            lst.innerHTML += `<tr> <td>${el.id}</td> <td>${el.name}</td> <td>${el.rating}</td>  <td>${el.category} </td> <td>${el.likes} </td><td>${btSel}</td><td>${btDel}</td> </tr>`;
            console.log(el.name)
        });
    });
        /*
            name: DataTypes.STRING,
            rating: DataTypes.NUMBER,
            
            category: DataTypes.STRING,
            likes: DataTypes.FLOAT
        */
            document.getElementById('submitBtn').addEventListener('click', e => {
                e.preventDefault();
    
                let name1 = document.getElementById('name').value
                let cat = document.getElementById('category').value
                let blogBody = document.getElementById('blogBody').value
                const data = {
                    name: name1,
                    
                    body: blogBody,
                    category: cat,
                };
             
               let isValid = validateInput(name1,cat,blogBody)
               console.log(isValid)
               if(!isValid) return   
       
                    fetch('http://localhost:9000/admin/blogs', {
                        method: 'POST',
                        headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                     },
                        body: JSON.stringify(data)
                    })
                    .then( res => res.json() )
                    selected = 0;
                    location.reload();
            });

            document.getElementById('updateBtn').addEventListener('click', e => {
                e.preventDefault();
    
                let name1 = document.getElementById('name').value
                let cat = document.getElementById('category').value
                let blogBody = document.getElementById('blogBody').value
                const data = {
                    id:selected,
                    name: name1,
                    body: blogBody,
                    category: cat,
                };
                
               let isValid = validateInput(name1,cat,blogBody)
               console.log(isValid)
               if(!isValid) return   
       
                    fetch('http://localhost:9000/admin/blogs/'+ selected, {
                        method: 'PUT',
                        headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                     },
                        body: JSON.stringify(data)
                    })
                    .then( res => res.json() )
                    selected = 0;
                    location.reload();
            });
    


    
    updateBtn
}
function deleteBlog(row){
    cookies = document.cookie.split('=');
    token = cookies[cookies.length - 1];
    var d = row.parentNode.parentNode.rowIndex;
    let obj = row.parentNode.parentNode
    var html= obj.getElementsByTagName('td')[0].innerHTML;// or $('div').html() if jquery
    var number = parseFloat(html.match(/-*[0-9]+/));  
    console.log(number)  
   
     document.getElementById('blogLst').deleteRow(d);
     const data = {
        id: number,
     }
     
        let path = 'http://localhost:9000/admin/blogs/' + number
        fetch(path, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
          })
          .then(res => res.json()) // or res.json()
          .catch( err => console.log("err") );  
}
function selectBlog(row){
    cookies = document.cookie.split('=');
    token = cookies[cookies.length - 1];

    var d = row.parentNode.parentNode.rowIndex;
    let obj = row.parentNode.parentNode
    var html= obj.getElementsByTagName('td')[0].innerHTML;// or $('div').html() if jquery
    var number = parseFloat(html.match(/-*[0-9]+/));  
    console.log(number)
    selected=number




    fetch('http://localhost:9000/admin/blogs/'+number,{
        headers: {
        'Authorization': `Bearer ${token}`
       }
    })
    .then( res => res.json() )
    .then( data => {
        const name = document.getElementById('name')

        const body = document.getElementById('blogBody')
        const category = document.getElementById('category')
 
     

        name.value = data.name
  
        body.value = data.body
        category.value = data.category      
  
        
       
    });
}



function validateName(name){
    let len = name.length
    
    if(len < 3 || len > 24){
        alert("name not valid")
        return false
    }
    else
        return true
}

function validateCategory(cat){
    let len = cat.length
    
    if(len < 6 || len > 25){
        alert("category not valid")
        return false
    }
    else
        return true
}

function validateBody(body){
    let len = body.length
    if(len < 50 || len > 2048){
        alert("body not valid")
        return false
    }
    else
        return true

}



function validateInput(name,email,nickname,password,password2){
    if(!validateName(name))
        return false
    if(!validateBody(body))
        return false
    if(!validateEmail(email))
        return false
    if(!validateNickname(nickname))
        return false
    if(!validatePassword(password,password2))
        return false
    return true

}

