import { api_key, fetchDataFromServer } from "./api.js";

export function sidebar() {
  const genreList = {};
  fetchDataFromServer(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,
    function (data) {
      // Extract genre IDs and names
      data.genres.forEach(genre => {
        genreList[genre.id] = genre.name;
      });

      // console.log(genreList)
      // Generate genre links after fetching data
      genreLink();
    }
  );

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");

  sidebarInner.innerHTML = `
    <div class="sidebar-list">
      <p class="title">Genre</p>
    </div>

    <div class="sidebar-list">
      <p class="title">Language</p>

      <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=en", "English")'>English</a>

      <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=hi", "Hindi")'>Hindi</a>

      <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=bn", "Bengali")'>Bengali</a>
      

      <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=mr", "Marathi")'>Marathi</a>


      <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=de", "German")'>German</a>

      <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=fr", "French")'>French</a>

      <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=ja", "Japanese")'>Japanese</a>

    </div>

    <div class="sidebar-footer">
      <p class="copyright">
        Copyright@2024
        <a href="https://www.themoviedb.org/" target="_blank">TMDB</a>
      </p>

      <img
        src="./assets/images/tmdb-logo.svg"
        alt="the movie database logo"
        width="130"
        height="17"
      />
    </div>
  `;

  const genreLink = function () {
    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", "/movie-list.html");
      link.setAttribute("menu-close", "");

      link.setAttribute("onclick",`getMovieList("with_genres=${genreId}","${genreName}")`);

      link.textContent = genreName;
      sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
    }

    const sidebar = document.querySelector(".sidebar");
    sidebar.appendChild(sidebarInner);
    toggleSidebar(sidebar);
  };
  
  const toggleSidebar = function (sidebar) {
    // toggle sidebar for mobile

    const sidebarBtn = document.querySelector("[menu-btn]");
    const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
    const sidebarClose = document.querySelectorAll("[menu-close]");
    const overlay = document.querySelector("[overlay]");


    addEventOnElements(sidebarTogglers,"click",function(){
        sidebar.classList.toggle("active");
        sidebarBtn.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    addEventOnElements(sidebarClose,"click",function(){
        sidebar.classList.remove("active");
        sidebarBtn.classList.remove("active");
        overlay.classList.remove("active");

    })
  };
}
