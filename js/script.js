document.addEventListener('DOMContentLoaded', function() {
    displayData();
    addWeb();

// Check if the current page matches the blocked page
    if (window.location.href.includes("facebook.com")) {
    window.location.href = "redirectPage.html";
  }
  
});
var id = 0;
var max = 0;
var setBlockingRule = true;
function addWeb() {
    document.getElementById('saveUrl').addEventListener('click', function() {
        if (max == 4) {
            return;
        }
        max++;
        var urlValue = document.getElementById('urlInput').value;
        var timeValue = document.getElementById('timeInput').value;

        // Check if the URL is valid
        var urlRegex = new RegExp(/^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i);

        // Check if the time is valid
        var timeRegex = new RegExp(/^\d{2}:\d{2}$/);

        if (!timeRegex.test(timeValue) || !urlRegex.test(urlValue)) {
            alert('Please enter a valid time or URL!');
            return;
        }

        id = Math.floor(Math.random() * 1000000000);
        const dataObject = { id: id, url: urlValue, time: timeValue };

        // Get the existing data from local storage
        var existingData = JSON.parse(localStorage.getItem('BlockedUrl')) || [];

        // Check if the data already exists
        var dataExists = existingData.some(function(item) {
            return item.url === urlValue && item.time === timeValue;
        });

        if (dataExists) {
            alert('Data already exists!');
            return;
        }

        // Add the new data to the existing data
        existingData.push(dataObject);

        // Store the updated data in local storage
        localStorage.setItem('BlockedUrl', JSON.stringify(existingData));

        displayData();
        updateJson(id, urlValue, timeValue);
    });
}

function displayData() {
    // Get all elements with the specified id
    var elementsToRemove = document.querySelectorAll('[id="elementToRemove"]');

    // Loop through the elements and remove them
    elementsToRemove.forEach(function(element) {
      element.remove();
    });

    // Get the existing data from local storage
    var existingData = JSON.parse(localStorage.getItem('BlockedUrl')) || [];

    // Loop through the data and add each item to the container
    existingData.forEach(function(item) {
        var newDiv = `
        <div id="elementToRemove" class="mb-3">
            <div id="localStorageShowUp-${item.id}" class="input-group">
                <span class="input-group-text">Url:</span>
                <input type="text" aria-label="Url" class="form-control" value="${item.url}" readonly>
                <span class="input-group-text">Time:</span>
                <input type="text" aria-label="Time" class="form-control" value="${item.time}" readonly>
                <button class="btn btn-outline-secondary delete-button" data-id="${item.id}" type="button">X</button>
            </div>
        </div>`;
        document.getElementById('addWeb').innerHTML += newDiv;
    });

    // Add event listeners to the delete buttons
    var deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            // Get the id of the item to delete
            var itemId = parseInt(event.target.getAttribute('data-id'));

            // Call the deleteData function with the id
            deleteData(itemId);
        });
    });
}


function deleteData(numOfId) {
    max--;
    var existingData = JSON.parse(localStorage.getItem('BlockedUrl')) || [];
    var index ;
    for (var i = 0; i < existingData.length; i++) {
        if (existingData[i].id === numOfId) {
            console.log(existingData[i].id);
            index = i;
        }
    }

    //var z = existingData.find(existingData.id(id));
    console.log(index);

    existingData.splice(index, 1);

    // Store the updated data in local storage
    localStorage.setItem('BlockedUrl', JSON.stringify(existingData));

    // Remove the corresponding div from the DOM
    var divId = `localStorageShowUp-${numOfId}`;
    var element = document.getElementById(divId);
    if (element) {
        element.remove();
    }
}

function updateJson(id, url, time) {
    const fs = require('fs');

    // Read the contents of the JSON file
    const data = fs.readFileSync('data.json');
    // Parse the JSON data into a JavaScript object
    const jsonData = JSON.parse(data);

    console.log("Before Adding data",JSON.stringify(jsonData, null, 4));

    // Modify the JavaScript object by adding new data
    jsonData.push({
        name: "James Den",
        email: "james.den@example.com"
    });


    // Convert the JavaScript object back into a JSON string
    const jsonString = JSON.stringify(jsonData);

    fs.writeFileSync('data.json', jsonString, 'utf-8', (err) => {
    if (err) throw err;
    console.log('Data added to file');
    });

    const update_data = fs.readFileSync('data.json');
    const updated_jsonData = JSON.parse(update_data);
    console.log("After Adding data",JSON.stringify(updated_jsonData, null, 4));
}

setInterval(function() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    if (currentHour >= 8 && currentHour < 20) { // Unblock between 8 am and 8 pm
        setBlockingRule = false; // Unblock
    } else {    
        setBlockingRule = true; // Block
    }
  }, 10000); // Check every minute

