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
