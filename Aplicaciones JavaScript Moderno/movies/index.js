const autocompleteConfig = {
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}"/>
            ${movie.Title}
            `
    },
    inputValue(movie){
        return movie.Title;
    },
    async fetchData(searchString) {
        const response = await axios.get('http://www.omdbapi.com/',{
            params : {
                apikey : '1f3556f5',
                s: searchString
            }
        });
        if(response.data.Error){
            return [];
        }
        return response.data.Search;
    }
}

createAutocomplete({
    ...autocompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovie(movie, document.querySelector('#left-summary'),'left');
    },
});

createAutocomplete({
    ...autocompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovie(movie, document.querySelector('#right-summary'),'right');
    },
});

let leftMovie;
let rightMovie;
const onMovie = async (movie, sumaryElement,side) =>{
    const response = await axios.get('http://www.omdbapi.com/',{
        params : {
            apikey : '1f3556f5',
            i: movie.imdbID
        }
    });
    sumaryElement.innerHTML = movieTemplate(response.data);
    if(side == 'left'){
        leftMovie = movie;
    } else {
        rightMovie = movie;
    }
    if(leftMovie && rightMovie){
        runComparision(leftMovie,rightMovie);
    }
}

const runComparision = () =>{
  const leftSideStats = document.querySelectorAll(
    '#left-summary .notification'
  );
  const rightSideStats = document.querySelectorAll(
    '#right-summary .notification'
  );

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];

    const leftSideValue = leftStat.dataset.value;
    const rightSideValue = rightStat.dataset.value;

    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    } else {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }
  });
}

const movieTemplate = movieDetail => {
    const dollars = parseInt(
        movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
      );
    const metascore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);
    
        if (isNaN(value)) {
          return prev;
        } else {
          return prev + value;
        }
      }, 0);
    const imgSrc = movieDetail.Poster === 'N/A' ? '' : movieDetail.Poster;
    return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>

    <article data-value=${awards} class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollars} class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metascore} class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
  };
  
