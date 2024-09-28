document.getElementById('calculate').addEventListener('click', function() {
    const emissions = parseFloat(document.getElementById('emissions').value);
    if (isNaN(emissions) || emissions <= 0) {
        alert("Please enter a valid number of tons.");
        return;
    }

    // Calculation logic
    const carbonCredits = emissions ; // Example: 0.5 credits per ton
    const treesNeeded = emissions * 45; // Example: 10 trees per ton

    // Display results
    document.getElementById('credits').textContent = carbonCredits.toFixed(2);
    document.getElementById('trees').textContent = treesNeeded;
    document.getElementById('results').classList.remove('hidden');
    
    // Get location
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById('location').textContent = `Location: Latitude ${latitude}, Longitude ${longitude}`;
    document.getElementById('location').classList.remove('hidden');
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

document.getElementById('openCamera').addEventListener('click', function() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();
            document.body.appendChild(video);

            const captureButton = document.createElement('button');
            captureButton.textContent = 'Capture Image';
            document.body.appendChild(captureButton);

            captureButton.addEventListener('click', function() {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0);

                // Stop the stream
                stream.getTracks().forEach(track => track.stop());
                video.remove();
                captureButton.remove();

                const img = document.createElement('img');
                img.src = canvas.toDataURL();
                document.body.appendChild(img);
            });
        })
        .catch(function(error) {
            console.error("Error accessing the camera: ", error);
            alert("Could not access the camera.");
        });
});
