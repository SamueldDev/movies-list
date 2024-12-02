

function renderWatchlist(){
    const watchlistContainer = document.getElementById("watchlist-container");
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    watchlistContainer.innerHTML = "";

    watchlist.forEach((movie, index) => {
        const { Title, Genre, imdbRating, Runtime, Plot, Poster} = movie;

        const imgDiv = document.createElement("div");
        imgDiv.classList.add("img-post");
        imgDiv.innerHTML = `<img serc=${Poster} alt="" class="img-poster" />`;

        const seriesDetails = document.createElement("div");
        seriesDetails.classList.add("series-details");

        // Remove button beside Genre

        seriesDetails.innerHTML = `
            <div class="display-title">
                <h3>${Title}</h3>
                <h4><i class="fa-solid fa-star"></i>${imdbRating}</h4>
            </div>
            <div class="runtime">
                <h5>${Runtime}</h5>
                <h5>${Genre}</h5>
                <button class="remove-btn" onclick="removeFromWatchlist(${index})">
                      <i class="fa-solid fa-minus"> Remove
                </button>
            </div>
            <p>${Plot}</p>
        `

        const divider = document.createElement("hr");
        watchlistContainer.appendChild(imgDiv);
        watchlistContainer.appendChild(seriesDetails);
        watchlistContainer.appendChild(divider);

    })
}


// Function to remove a movie from the watchlist
function removeFromWatchlist(index) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist.splice(index, 1);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    renderWatchlist(); // Refresh the list
}

document.addEventListener("DOMContentLoaded", renderWatchlist);