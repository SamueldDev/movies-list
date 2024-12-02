



 const myKey = import.meta.env.VITE_API_KEY


 const formElement = document.getElementById("form-to-submit")
 const inputText = document.getElementById("input-text")
 const movieContainer = document.getElementById("movie-container")



function getMovieSeries(movie){
    
    fetch(`https://www.omdbapi.com/?apikey=${myKey}&s=${movie}&type=series`)
        .then(response => {
            if(response.ok){
                return response.json()
            } else{
                throw new Error("Error fetching movie data")
            }
        })

        .then(data => {
        
            movieContainer.innerHTML = "",
            movieContainer.classList.add("movie-container")
            
            data.Search.slice(0, 3).forEach((item) => {
                fetch(`https://www.omdbapi.com/?apikey=${myKey}&i=${item.imdbID}`)
                    .then(res => res.json())
                    .then(details => {
                    
                        const { Title, Genre, imdbRating, Runtime, Plot, Poster } = details
                   
                    
                     const imgDiv = document.createElement("div")
                     imgDiv.classList.add("img-post")

                     imgDiv.innerHTML = `<img src=${Poster} alt="" class="img-poster" } />`

                     const seriesDetails = document.createElement("div")
                     seriesDetails.classList.add("series-details")

                     seriesDetails.innerHTML = `<div class="display-title">
                                                    <h3>${Title}</h3>
                                                    <h4><i class="fa-solid fa-star"></i>${imdbRating}</h4>
                                                </div>
                                                <div class="runtime">
                                                    <h5>${Runtime}</h5>
                                                    <h5>${Genre}</h5>
                                                    <button onclick="addToWatchlist('${encodeURIComponent(JSON.stringify(details))}')" class="watchlist-btn">
                                                     <i class="fa-solid fa-plus"></i> Watchlist
                                                     </button>
                                                </div>
                                                <p>${Plot}</p>

                     `
                        const divider = document.createElement("hr")

                            movieContainer.appendChild(imgDiv)
                            movieContainer.appendChild(seriesDetails)
                            movieContainer.appendChild(divider)
                            
                    })                                                                                                                      
            })

        })
        .catch(error => {
            
            showErrorMessage("Unabe to find what you are looking for, please try another search!!!")
        })

}


window.addToWatchlist = addToWatchlist;

function addToWatchlist(encodedMovie) {
    const movie = JSON.parse(decodeURIComponent(encodedMovie));
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}
window.addToWatchlist = addToWatchlist;




// function addToWatchlist(encodedMovie) {
//     const movie = JSON.parse(decodeURIComponent(encodedMovie));
//     let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
//     watchlist.push(movie);
//     localStorage.setItem("watchlist", JSON.stringify(watchlist));
// }


function showErrorMessage(message){
    movieContainer.innerHTML = "";
    movieContainer.innerHTML = `<p class="loading-message">${message}</p>`
}

// function loadingMessage(message){
//     movieContainer.innerHTML = "";
//     movieContainer.innerHTML = `<h2 class="loading-message>${message}</h2>`
// }


function loadingMessage(message){
    movieContainer.innerHTML = "";
    movieContainer.innerHTML = `<h2 class="loading-message">${message}</h2>`;
}


formElement.addEventListener("submit", function(e){
    e.preventDefault()
    const movieName = inputText.value.trim()
    if(movieName !== ""){
        
        loadingMessage("fetching series information")
        
        getMovieSeries(movieName);
        
       
    } else{
       showErrorMessage("Enter movie name")
    }
})
