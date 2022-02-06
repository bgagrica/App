

function init(){

    
    fetch('https://gagrica-rest.herokuapp.com/moderators')
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('modLst');

            data.forEach( el => {
                let btDel = '<button type="submit" value="Submit" class="delBtn" id="${el.id}" onclick="deleteMod(this)">Delete</button>'
                let btSel = '<button type="submit" value="Submit" class="selBtn" id="${el.id}" onclick="selectMod(this)">Select</button>'
                lst.innerHTML += `<tr> <td>${el.id}</td> <td>${el.name}</td> <td>${el.gmail} </td> <td>${btSel}</td> <td>${btDel}</td> </tr>`;
                
            });
        });

        
    
     

       

 

       
}
function deleteMod(row){
    var d = row.parentNode.parentNode.rowIndex;
    let obj = row.parentNode.parentNode
    var html= obj.getElementsByTagName('td')[0].innerHTML;// or $('div').html() if jquery
    var number = parseFloat(html.match(/-*[0-9]+/));  
    console.log(number)  
   
     document.getElementById('modLst').deleteRow(d);
     const data = {
        id: number,
     }
    
            let path = 'https://gagrica-rest.herokuapp.com/admin/moderators/' + number
        fetch(path, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          .then(res => res.json()) // or res.json()
          .catch( err => console.log("err") );


    
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
    
            let path = 'https://gagrica-rest.herokuapp.com/admin/blogs/' + number
        fetch(path, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          .then(res => res.json()) // or res.json()
          .catch( err => console.log("err") );

}

