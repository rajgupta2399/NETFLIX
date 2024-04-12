"use strict";

import { sidebar } from "./sidebar.js";
import { api_key, fetchDataFromServer, imageBaseURL } from "./api.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";

const pageContent = document.querySelector("[page-content]");

sidebar();
search();

const homePageSections = [
  {
    title: "Upcoming Movies",
    path: "/movie/upcoming",
  },

  {
    title: "Today's Trending Movies",
    path: "/trending/movie/week",
  },
  {
    title: "Top Rated Movies",
    path: "/movie/top_rated",
  },
];

const genreList = {
  // create genre string from genre_id eg : [23,43] = "action"

  toString(genreIdList) {
    let newGenreList = [];
    for (const genreId of genreIdList) {
      this[genreId] && newGenreList.push(this[genreId]);
    }

    return newGenreList.join(", ");
  },
};

// fetchDataFromServer(
//   `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,
//   function (data) {
//     // Extract genre IDs and names
//     data.genres.forEach((genre) => {
//       genreList[genre.id] = genre.name;
//     });

//     fetchDataFromServer(
//       `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=7`,
//       heroBanner
//     );
//   }
// );

const fetchGenres = () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`;
  fetchDataFromServer(url, handleGenres);
}

const handleGenres = (data) => {
  data.genres.forEach((genre) => {
      genreList[genre.id] = genre.name;
  });
  fetchPopularMovies();
}

const fetchPopularMovies = () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=7`;
  fetchDataFromServer(url, heroBanner);
}

// Start the process by fetching genres
fetchGenres();

const heroBanner = function ({ results: movieList }) {
  const banner = document.createElement("section");
  banner.classList.add("banner");
  banner.ariaLabel = "Popular Movies";

  banner.innerHTML = `
    <div class="banner-slider"></div>

    <div class="slider-control">
      <div class="control-inner"></div>
    </div>
  `;

  let controlItemIndex = 0;
  for (const [index, movie] of movieList.entries()) {
    const {
      backdrop_path,
      title,
      release_date,
      genre_ids,
      overview,
      poster_path,
      vote_average,
      id,
    } = movie;

    const sliderItem = document.createElement("div");
    sliderItem.classList.add("slider-item");
    sliderItem.setAttribute("slider-item", "");

    sliderItem.innerHTML = `
      <img
        src="${imageBaseURL}w1280${backdrop_path}"
        alt="${title}"
        class="img-cover"
        loading=${index === 0 ? "eager" : "lazy"}
      />

      <div class="banner-content">
        <h2 class="heading">${title}</h2>

        <div class="meta-list">
          <div class="meta-item">${release_date.split("-")[0]}</div>
          <div class="meta-item card-badge">${vote_average.toFixed(1)}</div>
        </div>

        <p class="genre">${genreList.toString(genre_ids)}</p>

        <p class="banner-text">
         ${overview}
        </p>

        <a href="./detail.html" class="btn" onClick="getMovieDetail(${id})">
          <img
            src="./assets/images/play_circle.png"
            alt="Watch Now Button"
            width="24"
            height="24"
            aria-hidden="true"
            
          />
          <span class="span">Watch Now</span>
        </a>
      </div>
    `;

    banner.querySelector(".banner-slider").appendChild(sliderItem);

    const controlItem = document.createElement("button");
    controlItem.classList.add("poster-box", "slider-item");
    controlItem.setAttribute("slider-control", `${controlItemIndex}`);

    controlItemIndex++;

    controlItem.innerHTML = ` <img
      src="${imageBaseURL}w154${poster_path}"
      alt="Slide to ${title}"
      loading="lazy"
      draggable="false"
      class="img-cover"
    />`;

    banner.querySelector(".control-inner").appendChild(controlItem);
  }

  pageContent.appendChild(banner);

  addHeroSlide();
  // ----------------------------------------------------------------------------------------------------------------
  // fetch data for home page sections

  for (const { title, path } of homePageSections) {
    fetchDataFromServer(
      `https://api.themoviedb.org/3${path}?api_key=${api_key}&language=en-US&page=1`,
      createMovieList,
      title
    );
  }
};

const addHeroSlide = function () {
  const sliderItems = document.querySelectorAll("[slider-item]");
  const sliderControls = document.querySelectorAll("[slider-control]");

  let lastSliderItem = sliderItems[0];
  let lastSliderControl = sliderControls[0];

  lastSliderItem.classList.add("active");
  lastSliderControl.classList.add("active");

  const sliderStart = function () {
    lastSliderItem.classList.remove("active");
    lastSliderControl.classList.remove("active");

    sliderItems[Number(this.getAttribute("slider-control"))].classList.add("active");
    this.classList.add("acitve");

    lastSliderItem = sliderItems[Number(this.getAttribute("slider-control"))];
    lastSliderControl = this;
  };

  addEventOnElements(sliderControls, "click", sliderStart);
};

const createMovieList = function ({ results: movieList }, title) {
  const movieListElem = document.createElement("section");
  movieListElem.classList.add("movie-list");
  movieListElem.ariaLabel = `${title}`;

  movieListElem.innerHTML = `
    <div class="title-wrapper">
      <h3 class="title-large">${title}</h3>
    </div>

    <div class="slider-list">
      <div class="slider-inner"></div>
    </div>
  `;

  for (const movie of movieList) {
    const movieCard = createMovieCard(movie);
    movieListElem.querySelector(".slider-inner").appendChild(movieCard);
  }
  pageContent.appendChild(movieListElem);
};
