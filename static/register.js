
function init() {
  
         

    document.getElementById('submitBtn').addEventListener('click', e => {
            e.preventDefault();

            const name = document.getElementById('name').value
            const email = document.getElementById('email').value
            const nickname= document.getElementById('nickname').value
            const password1=document.getElementById('password').value
            const password2= document.getElementById('confPassword').value 
            let role
            let canMakeBlogs = false
            if(document.getElementById('userRB').checked)
                role = 'user'
            else  if(document.getElementById('moderatorRB').checked)
                 role = 'moderator'
            else  if(document.getElementById('adminRB').checked)
                 role = 'admin'
            if(role !== 'user')
                canMakeBlogs = true
            
            
            
            
            const data = {
                name: name,
                email: email,
                nickname: nickname,
                password: password1,
                role:role,
                canMakeBlogs: canMakeBlogs,
            };
           
           resetFields() 
           
            
            if(!validateInput(name,email,nickname,password1,password2,role,canMakeBlogs))return
           
                
                fetch('https://branko-auth.herokuapp.com/admin/api_register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                .then( res => res.json() )
                .then( el => {
                    if (el.msg) {
                        alert("Registring error");
                    } else {
                        window.location.href = 'login.html';
                    }
                });
            
        });
}

function resetFields(){
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('nickname').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confPassword').value = '';
}


function validateName(name){
    let len = name.length
    
    if(len < 3 || len > 15){
        alert("name not valid")
        return false
    }
    else
        return true
}

function validateEmail(email){
    let len = email.length
    
    if(len < 6 || len > 25){
        alert("email not valid")
        return false
    }
    else
        return true
}

function validateNickname(nickname){
    let len = nickname.length
    
    if(len < 3 || len > 12){
        alert("nickname not valid")
        return false
    }
    else
        return true
}

function validatePassword(pw1,pw2){
    if(pw1!==pw2){
        alert("passwords do not match")
        return false
    }
    let len = pw1.length
      
    if(len < 5 || len > 15){
        alert("password not valid, at least 5 and at max 15 chars")
        return false
    }
    else
        return true
}
function validateRole(role){
    if(role ==='admin' || role ==='user' || role ==='moderator')
        return true
    return false
}

function validateCMB(canMakeBlogs){
    if(typeof(canMakeBlogs)==="boolean")
        return true
    return false

}

function validateInput(name,email,nickname,password,password2,role,canMakeBlogs){
    if(!validateName(name))
        return false
    if(!validateEmail(email))
        return false
    if(!validateNickname(nickname))
        return false
    if(!validatePassword(password,password2))
        return false
    if(!validateRole(role))
        return false
    if(!validateCMB(canMakeBlogs))
        return false
    
    return true

}
