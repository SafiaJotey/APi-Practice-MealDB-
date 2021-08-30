const searchFood=() =>{
    const searchField=document.getElementById("search-field");
    const searchText=searchField.value;
    searchField.value='';
    if(searchText==''){
      const containerDiv=document.getElementById("cardContainer"); 
   
      // containerDiv.innerHTML='';
      containerDiv.textContent='';
      const singleMealContainer=document.getElementById("singleCardDetail");
      singleMealContainer.textContent='';
      const emptyField=document.getElementById("emptyField");
      const div=document.createElement("div");
      div.innerHTML=`
      <div class="spinner-border text-primary" role="status">
    </div>`;
    emptyField.appendChild(div);
      
    }
    else{
      const emptyField=document.getElementById("emptyField");
      emptyField.textContent='';
      const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>searchResultFood(data.meals))
    }

}

searchResultFood=(meals)=>{
  
    const containerDiv=document.getElementById("cardContainer"); 
   
    // containerDiv.innerHTML='';
    containerDiv.textContent='';
    if(meals==null){
      const NoResultDiv=document.createElement("div");
      NoResultDiv.innerHTML=`
        <h3>No result found</h3>
             `;

        containerDiv.appendChild(NoResultDiv);
        
    }
   
   else{
    meals.forEach(meal=>{
      const singleMealContainer=document.getElementById("singleCardDetail");
      singleMealContainer.textContent='';
       const createDiv=document.createElement("div");
       createDiv.classList.add("col");
       createDiv.innerHTML=`
       <div onclick="loadMealDetails(${meal.idMeal})" class="card my-3">
           <img src="${meal.strMealThumb}" class="card-img-top " alt="">
           <div class="card-body">
             <h5 class="card-title">${meal.strMeal}</h5>
             <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
           </div>
         </div> `;

       containerDiv.appendChild(createDiv);
   })
   loadMealDetails=async mealId=>{
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res=await fetch(url);
    const data=await res.json();
    DisplaySingleMealDetails(data.meals[0]);

    // fetch(url)
    // .then(res=>res.json())
    // .then(data=>DisplaySingleMealDetails(data.meals[0]))
}
DisplaySingleMealDetails=(singleMeal)=>{
  
      const singleMealContainer=document.getElementById("singleCardDetail");
      singleMealContainer.textContent='';
      const div=document.createElement("div");
      div.classList.add("card", "style");
      div.innerHTML=`
      <img src="${singleMeal.strMealThumb}" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title">${singleMeal.strMeal}</h5>
      <p class="card-text">${singleMeal.strInstructions}</p>
    </div>`
    singleMealContainer.appendChild(div);
    

}

 }

   
}