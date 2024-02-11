document.addEventListener('DOMContentLoaded', function() {
    displayData();
    addWeb();
    timeUpdate();
    blockPages();

// Check if the current page matches the blocked page
    if (window.location.href.includes("facebook.com")) {
    window.location.href = "redirectPage.html";
  }
  
});
var id = 0;
var max = 0;
var setBlockingRule = true;


function timeUpdate() {
    document.getElementById('saveTime').addEventListener('click', function() {
        var timeBlockValue = document.getElementById('timeBlock').value;
        var timeUnblockValue = document.getElementById('timeUnblock').value;

        var existingData = JSON.parse(localStorage.getItem('Time')) || [];
        var dataObject = {timeBlock: timeBlockValue, timeUnblock: timeUnblockValue};
        existingData.push(dataObject);
        localStorage.setItem('Time', JSON.stringify(existingData));
    });
}

function addWeb() {
    document.getElementById('saveUrl').addEventListener('click', function() {
        if (max == 4) {
            return;
        }
        max++;
        var urlValue = document.getElementById('urlInput').value;

        // Check if the URL is valid
        //var urlRegex = new RegExp(/^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i);


        // if (!urlRegex.test(urlValue)) {
        //     alert('Please enter a valid URL!');
        //     return;
        // }

        id = Math.floor(Math.random() * 1000000000);
        const dataObject = { id: id, url: urlValue};

        // Get the existing data from local storage
        var existingData = JSON.parse(localStorage.getItem('BlockedUrl')) || [];

        // Check if the data already exists
        var dataExists = existingData.some(function(item) {
            return item.url === urlValue ;
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

function blockPages() {
    // Check for visibility change
    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === 'hidden') {
        // Tab switched or minimized
        console.log("Tab switched or minimized");
        } else {
        // Tab active
        console.log("Tab active");
        }
    });
}

setInterval(function() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    if (currentHour >= 8 && currentHour < 20) { // Unblock between 8 am and 8 pm
        setBlockingRule = false; // Unblock
    } else {    
        setBlockingRule = true; // Block
    }
}, 60000); // Check every minute
