let selected = 0
let cookies = document.cookie.split('=');
let   token = cookies[cookies.length - 1];
function init(){
    cookies = document.cookie.split('=');
    token = cookies[cookies.length - 1];

    fetch('https://branko-rest.herokuapp.com/admin/users' ,{
        headers: {
        'Authorization': `Bearer ${token}`
       }
    })
    .then( res => res.json() )
    .then( data => {
        const lst = document.getElementById('usrLst');

        data.forEach( el => {
            let btDel = '<button type="submit" value="Submit" class="delBtn" id="${el.id}" onclick="deleteUsr(this)">Delete</button>'
            let btSel = '<button type="submit" value="Submit" class="selBtn" id="${el.id}" onclick="selectUsr(this)">Select</button>'
            lst.innerHTML +=  `<tr> <td>${el.id}</td> <td>${el.name}</td> <td>${el.email} </td> <td>${btSel}</td> <td>${btDel}</td> </tr>`;
        });
    });

    document.getElementById('submitBtn').addEventListener('click', e => {
        e.preventDefault();
        if(selected===0)return
        const name1 = document.getElementById('name').value
        const email1 = document.getElementById('email').value
        const nickName1= document.getElementById('nickname').value
        const password1=document.getElementById('password').value
        const canMakeBlogs = document.getElementById('canMakeBlogs').value
        const role = document.getElementById('role').value
        console.log(nickName1)
        const data = {
            id: selected,
            name: name1,
            email: email1,
            nickname: nickName1,
            password: password1,
            canMakeBlogs: canMakeBlogs,
            role:role
        };
        console.log(token)
        fetch('https://branko-rest.herokuapp.com/admin/users/'+selected, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(data)
                })
                .then( res => res.json() )
               
        location.reload();
    });

}

function deleteUsr(row){
    cookies = document.cookie.split('=');
    token = cookies[cookies.length - 1];
    var d = row.parentNode.parentNode.rowIndex;
    let obj = row.parentNode.parentNode
    var html= obj.getElementsByTagName('td')[0].innerHTML;// or $('div').html() if jquery
    var number = parseFloat(html.match(/-*[0-9]+/));  
    console.log(number)  
   
     document.getElementById('usrLst').deleteRow(d);
     const data = {
        id: number,
     }
    
            let path = 'https://branko-rest.herokuapp.com/admin/users/' + number
        fetch(path, {
            method: 'DELETE',
            
            headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`},
            body: JSON.stringify(data)
          })
          .then(res => res.json()) 
          .catch( err => console.log("err") );

}

function selectUsr(row){
    cookies = document.cookie.split('=');
    token = cookies[cookies.length - 1];

    var d = row.parentNode.parentNode.rowIndex;
    let obj = row.parentNode.parentNode
    var html= obj.getElementsByTagName('td')[0].innerHTML;
    var number = parseFloat(html.match(/-*[0-9]+/));  
    console.log(number)
    selected=number




    fetch('https://branko-rest.herokuapp.com/admin/users/'+number,{
        headers: {
        'Authorization': `Bearer ${token}`
       }
    })
    .then( res => res.json() )
    .then( data => {
        const name = document.getElementById('name')
        const email = document.getElementById('email')
        const nickname = document.getElementById('nickname')
        const password = document.getElementById('password')
        const canMakeBlogs = document.getElementById('canMakeBlogs')
        const role = document.getElementById('role')

        name.value = data.name
        email.value = data.email
        nickname.value = data.nickname
        password.value = data.password      
        canMakeBlogs.value = data.canMakeBlogs
        role.value = data.role
       
    });
}

