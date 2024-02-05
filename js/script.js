document.addEventListener('DOMContentLoaded', function() {
    displayData();
    addWeb();
});
var id = 0;
var max = 0;
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
                <button class="btn btn-outline-secondary" onClick="deleteData(${item.id})" type="button">X</button>
            </div>
        </div>`;
        document.getElementById('addWeb').innerHTML += newDiv;
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

// function deleteData(index) {
//     // Get the existing data from local storage
//     var existingData = JSON.parse(localStorage.getItem('BlockedUrl')) || [];
//     console.log(index);
//     // Remove the item at the specified index
//     existingData.splice(index, 1);

//     // Store the updated data in local storage
//     localStorage.setItem('BlockedUrl', JSON.stringify(existingData));

//     // Remove the corresponding div from the DOM
//     var divId = `localStorageShowUp-${index}`;
//     var element = document.getElementById(divId);
//     if (element) {
//         element.remove();
//     }
// }