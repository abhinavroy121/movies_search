
let onemovie = JSON.parse(localStorage.getItem('onemovie'));


 document.getElementById('navbar').addEventListener('click',()=>{
    localStorage.removeItem("onemovie");
    window.location.href="index.html";
 })
   let timerid;
   var movies = document.getElementById("movies");
   var moviesbar = document.getElementById("searchbar-content");
  async function searchMovie(){
  try{
   let input = document.getElementById('search').value;
     // console.log(input)
 
    let res = await fetch(`https://www.omdbapi.com/?s=${input}&apikey=a544afde`);
     
    let data = await res.json();
      
    let arrayofmovies = data.Search;
    console.log(arrayofmovies);
    return arrayofmovies;
 //    appendmovies(data.Search);
    //   
 
  }
 
  catch (error){
 
  console.log("error", error);
 
  }
   }
 
 
    function appendmoviesbar(data){
 
       moviesbar.innerHTML = null;
 
       if(data === undefined){
           return false;
       }
 
       data.forEach(function(item,index,array){

        let innerdivsearch = document.createElement("div");
          innerdivsearch.setAttribute('id','innerdivsearch')
          innerdivsearch.style.display='flex'
        let p = document.createElement("p");
        
        p.innerHTML=item.Title;

        let image = document.createElement("img");
        image.src = item.Poster;
       
        innerdivsearch.append(image,p)
        moviesbar.append(innerdivsearch);
       
        let arr =[]
        innerdivsearch.addEventListener("click",()=>{
        
          console.log(array[index]);
          arr.push(array[index]);
          localStorage.setItem('onemovie',JSON.stringify(arr));
          window.location.href='index.html'

        })
          
       })
    }
   // main function invoking the searchmovie function and appendmovie function
  async function main(){
      try{
    let data = await searchMovie();
 
     if(data === undefined){
         return false;
     }
 
      appendmoviesbar(data)
 }
 
   catch(err){
       console.log('err',err)
   }
   }
 
 
   function debounce(func,delay){
 
     // console.log('timerid:',timerid);
 
     if(timerid){
         clearTimeout(timerid);
 
     }
 
     timerid=setTimeout(function (){
         func();// still the main() function
     },delay);
   }
 

     
      onemovie.map(function (item){
        
        movies.innerHTML=null;
        let maindiv= document.createElement('div')
         maindiv.setAttribute('id', 'maindiv')
       
         let div = document.createElement("div");
         div.setAttribute('id', 'innerdiv')
        let image = document.createElement("img");
         image.src = item.Poster;
         let title = document.createElement("h3");
         title.innerText= item.Title;
         let type = document.createElement("p");
         type.innerText= item.Type;
         let flexdiv = document.createElement("div");
         flexdiv.setAttribute('id', 'flexdiv')
         let year = document.createElement("p");
         year.innerHTML= `Year: ${item.Year}`;
         
         let rating = document.createElement("p");
         function rangerate(min,max){
         return (Math.random()*(max-min)+min).toFixed(1)
         }
        let myrating=rangerate(7,10)
        if(myrating>=8.5){
          rating.innerHTML= ` &#128077; Ratings: &#9734; ${myrating}/10 `;
        }
        else{
         rating.innerHTML= `Ratings: &#9734; ${myrating}/10 `;
        }
         flexdiv.append(rating,year)
         div.append(image,title,type,flexdiv);
         maindiv.append(div)
         
        movies.append(maindiv)


    })
   
   

                
            
        
//     })
// }
// 0:
// Poster: "https://m.media-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg"
// Title: "Thor"
// Type: "movie"
// Year: "2011"
// imdbID: "tt0800369"