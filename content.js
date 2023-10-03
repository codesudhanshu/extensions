// Create a div element for your extension
const extensionDiv = document.createElement('div');
extensionDiv.style.position = 'fixed';
extensionDiv.style.top = '0';
extensionDiv.style.right = '0';
extensionDiv.style.width = '300px';
extensionDiv.style.height = '100%';
extensionDiv.style.backgroundColor = 'aqua';
extensionDiv.style.zIndex = '9999';
extensionDiv.style.display = 'none';

const title = document.createElement('h1')
title.innerText='Prompt Smith';
extensionDiv.appendChild(title)

// Create an input element for the search bar
const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.placeholder = 'Search Prompt';
searchBar.style.width = '100%';
searchBar.style.padding = '10px';

// Create a container element to display the auto-suggestions
const suggestionContainer = document.createElement('div');
suggestionContainer.style.backgroundColor = 'white';
suggestionContainer.style.border = '1px solid #ccc';
suggestionContainer.style.maxHeight = '200px';
suggestionContainer.style.overflowY = 'auto';
suggestionContainer.style.display = 'none';

// Append the search bar and suggestion container to the extension div
extensionDiv.appendChild(searchBar);
extensionDiv.appendChild(suggestionContainer);

// Fetch the JSON data
fetch(chrome.extension.getURL('data.json'))
  .then(response => response.json())
  .then(jsonData => {
    // Attach an event listener to the search bar input to listen for changes and perform auto-suggestions
    searchBar.addEventListener('input', function() {
      const searchTerm = searchBar.value.toLowerCase();
      const filteredResults = jsonData.filter(function(item) {
        const itemName = item.name.toLowerCase();
        return itemName.includes(searchTerm);
      });
      displaySuggestions(filteredResults);
    });
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });

// Function to display the auto-suggestions
function displaySuggestions(suggestions) {
  suggestionContainer.innerHTML = '';
  if (suggestions.length > 0) {
    suggestions.forEach(function(suggestion) {
      const suggestionItem = document.createElement('div');
      suggestionItem.textContent = suggestion.name;
      suggestionItem.style.padding = '5px';
      suggestionItem.style.cursor = 'pointer';
      suggestionItem.addEventListener('click', function() {
        searchBar.value = suggestion.name;
        suggestionContainer.style.display = 'none';
      });
      suggestionContainer.appendChild(suggestionItem);
    });
    suggestionContainer.style.display = 'block';
  } else {
    suggestionContainer.style.display = 'none';
  }
}

// Append the extension div to the document body
document.body.appendChild(extensionDiv);

// Create an image element to act as the extension button
const extensionButton = document.createElement('img');
extensionButton.src = chrome.extension.getURL('sudh.png');
extensionButton.style.position = 'fixed';
extensionButton.style.top = '20px';
extensionButton.style.right = '20px';
extensionButton.style.width = '40px';
extensionButton.style.height = '40px';
extensionButton.style.cursor = 'pointer';
extensionButton.style.zIndex = '9999';

// Function to toggle the extension visibility
function toggleExtension() {
  if (extensionDiv.style.display === 'none') {
    extensionDiv.style.display = 'block';
  } else {
    extensionDiv.style.display = 'none';
  }
}

// Add a click event listener to the extension button
extensionButton.addEventListener('click', toggleExtension);

// Append the extension button to the document body
document.body.appendChild(extensionButton);
