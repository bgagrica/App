let cookies = document.cookie.split('=');
let token = cookies[cookies.length - 1];
function init() {
    //console.log(document.cookie)
   // console.log(token)
   
    //console.log(token)

   fetch('https://branko-app.herokuapp.com//', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` }
    })
    .then( res => res.json() )
    .then( el => {
        if (el.msg) {
            alert(el.msg);
            
        } else {
        
            console.log(el.msg)
            window.location.href = 'index.html';
        }
    });



    console.log("tujsam")
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();
      
        const data = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value
        };

    
        fetch('https://branko-auth.herokuapp.com/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert("U must log in first");
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    console.log('loginovo')
                    console.log(document.cookie)
                    window.location.href = 'index.html';
                }
            });
    });
}