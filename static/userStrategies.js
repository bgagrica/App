let selected = 0
let cookies = document.cookie.split('=');
let   token = cookies[cookies.length - 1];
function init(){
    cookies = document.cookie.split('=');
    token = cookies[cookies.length - 1];

    // headers: {
    //     'Authorization': `Bearer ${token}`
    // }
    fetch('https://gagrica-rest.herokuapp.com/admin/userStrategies' ,{
        headers: {
        'Authorization': `Bearer ${token}`
       }
    })
    .then( res => res.json() )
    .then( data => {
        const lst = document.getElementById('usrStrLst');

        data.forEach( el => {
            let btDel = '<button type="submit" value="Submit" class="delBtn" id="${el.id}" onclick="deleteUsrStr(this)">Delete</button>'
           
            lst.innerHTML +=  `<tr> <td>${el.id}</td> <td>${el.userId}</td> <td>${el.name} </td> <td>${el.body} </td> <td>${btDel}</td> </tr>`;
        });
    });



}

function deleteUsrStr(row){
    cookies = document.cookie.split('=');
    token = cookies[cookies.length - 1];
    var d = row.parentNode.parentNode.rowIndex;
    let obj = row.parentNode.parentNode
    var html= obj.getElementsByTagName('td')[0].innerHTML;
    var number = parseFloat(html.match(/-*[0-9]+/));  
    console.log(number)  
   
     document.getElementById('usrStrLst').deleteRow(d);
     const data = {
        id: number,
     }
    
            let path = 'https://gagrica-rest.herokuapp.com/admin/userStrategies/' + number
        fetch(path, {
            method: 'DELETE',
            
            headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`},
            body: JSON.stringify(data)
          })
          .then(res => res.json())
          .catch( err => console.log("err") );

}

