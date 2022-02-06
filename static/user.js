let cookies = document.cookie.split('=');

let token = cookies[cookies.length - 1];

function init(){

    fetch('https://gagrica-rest.herokuapp.com/admin/user', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then( res => res.json() )
    .then( data => {
        const lst = document.getElementById('paragraf');

       
           lst.innerHTML += `name: ${data.name}, nickname: ${data.nickname}`;
            console.log(data.name)
       
    });





}