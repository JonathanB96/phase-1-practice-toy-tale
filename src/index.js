let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  //Get request

  fetch('http://localhost:3000/toys')
  .then(res=>res.json())
  .then(res=>{
     
    let toyCollection = document.querySelector("#toy-collection");
    for(let obj of res){
     let img = document.createElement("img");
     img.className = "toy-avatar";
     let h2 = document.createElement("h2");
     h2.textContent = obj.name;
     let p = document.createElement("p");
     p.textContent = obj.likes
     let btn = document.createElement("button");
     btn.className = "like-btn";
     btn.textContent = "Like";
     let card = document.createElement("div");
      card.className = "card";
      img.setAttribute("src", obj.image);
      card.appendChild(h2);
      card.appendChild(img);
      card.appendChild(p);
      card.appendChild(btn)
      toyCollection.appendChild(card);
    //like btn
    card.querySelector(".like-btn");
    card.addEventListener('click', ()=>{
      obj.likes+=1;
      p.textContent =obj.likes;

      fetch(`http://localhost:3000/toys/${obj.id}`,{
        'method' : 'PATCH',
        headers : { "Content-Type": "application/json",
                    Accept: "application/json"
                  },
        body: JSON.stringify(obj)      
        
      } )
      .then(res=>res.json())
      .then(res=>{console.log(res)})

      
    })
        
    }
 
 
  })

  //POST request

  let form = document.querySelector(".add-toy-form");
  

  form.addEventListener('submit', ()=>{
    let FormData = {name:"", image:"", likes: 0}
    let inputs = document.querySelectorAll(".input-text");
    FormData.name = inputs[0].value;
    FormData.image = inputs[1].value;
       
    fetch("http://localhost:3000/toys", {
    'method' : 'POST',
    headers : { "Content-Type": "application/json",
                Accept: "application/json"
              },
    body: JSON.stringify(FormData)      
    
  }

  )
  })



  
  

});

 


