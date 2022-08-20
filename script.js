const APIURL =
	"https://api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=2587fe27ddb1758c80e76c271cedfd75&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
	"https://api.themoviedb.org/4/search/movie?&api_key=2587fe27ddb1758c80e76c271cedfd75&query=";

const main = document.getElementById("main");

const home = document.getElementById("home");
home.addEventListener("click", (e) => {
	location.reload();
});

fetch(APIURL)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		console.log(data.results);
		const movieArr = data.results;
		movieArr.map(addCard);
	});

function addCard(movie) {
	const movieCard = document.createElement("div");
	movieCard.classList.add("movie-card");

	movieCard.innerHTML = `
  
        <img
            src="${IMGPATH + movie.poster_path}"
            alt="${movie.title}"
        />
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <p class="${colorClass(movie.vote_average)}">${movie.vote_average}
            </p>
        </div>
     
        <div class="overview">   <h4> Summary</h4> ${movie.overview}</div>
  
    `;

	main.append(movieCard);
}

function colorClass(vote) {
	if (vote >= 8) {
		return "green";
	} else if (vote >= 5) {
		return "orange";
	} else {
		return "red";
	}
}

const searchInput = document.getElementById("search");
const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
	e.preventDefault();
	const searchValue = searchInput.value;
	console.log(searchValue);
	if (searchValue) {
		main.innerHTML = "";
		fetch(SEARCHAPI + searchValue)
			.then((res) => res.json())
			.then((data) => data.results)
			.then((searchMovies) => {
				console.log(searchMovies);
				if (searchMovies.length != 0) {
					searchMovies.map(addCard);
				} else {
					main.innerHTML = `<h2>This movie does not exist. <br> Try Again </h2>`;
				}
			});
		searchInput.value = "";
	}
});
