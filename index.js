import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//Form Submission Event Listner
searchForm.addEventListener('submit', e => {
  //Get search term
  const searchTerm = searchInput.value;

  //Get Sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  //Get Limit
  const searchLimit = document.getElementById('limit').value;

  //Check input
  if (searchTerm === '') {
    //Show Message
    showMessage('Please add a search term', 'alert-danger');
  }

  //Clear Input
  searchInput.value = '';

  //Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy).then(res => {
    if (res.length === 0) {
      showMessage('No Results Found', 'alert-info');
    } else {
      let output = `
      <div class='card-columns'>`;
      //Loop through Posts
      res.forEach(post => {
        //Check For Image
        const image = post.preview
          ? post.preview.images[0].source.url
          : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
        output += `
        <div class="card">
          <img class="card-img-top" src="${image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${truncateText(post.selftext, 100)}</p>
            <a href="${
              post.url
            }" target="_blank" class="btn btn-primary">Read More</a>
            <hr>
            <span class="badge badge-secondary">Subreddit:${
              post.subreddit
            }</span>
            <span class="badge badge-dark">Subreddit:${post.score}</span>
          </div>
        </div>
        `;
      });
      output += `<div>`;
      document.getElementById('results').innerHTML = output;
    }
  });

  e.preventDefault();
});

//Show Message
function showMessage(message, className) {
  // Create Div
  const div = document.createElement('div');
  //Add classes
  div.className = `alert ${className}`;
  //Add Message
  div.appendChild(document.createTextNode(message));
  //Get Parent Container/Get Div To Put Before
  const searchContainer = document.getElementById('search-container');
  const search = document.getElementById('search');
  //Insert Message
  searchContainer.insertBefore(div, search);

  //Timeout Alert
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
}

//Truncate Text
function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit);

  if (shortened === -1) {
    return text;
  }

  return text.substring(0, shortened);
}
