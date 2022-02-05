function init(){

    console.log(document.cookie)    
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    document.getElementById('btnUser').addEventListener('click', e => {
        e.preventDefault();
        window.location.href = 'indexUser.html';

    })

    document.getElementById('btnModerator').addEventListener('click', e => {
        e.preventDefault();
        window.location.href = 'indexModerator.html';
    
    })

    document.getElementById('btnAdmin').addEventListener('click', e => {
        e.preventDefault();
        window.location.href = 'indexAdmin.html';
    })


}