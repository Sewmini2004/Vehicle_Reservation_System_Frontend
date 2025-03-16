export function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 6.9271, lng: 79.8612 }, // Default center (Colombo, Sri Lanka)
        zoom: 12,
    });

    const pickupInput = document.getElementById("pickupLocation");
    const dropInput = document.getElementById("dropLocation");
    const distanceInput = document.getElementById("distance"); // To display the distance between pickup and drop locations

    const pickupMarker = new google.maps.Marker({ map });
    const dropMarker = new google.maps.Marker({ map });

    const geocoder = new google.maps.Geocoder();
    const distanceService = new google.maps.DistanceMatrixService();
    const directionsService = new google.maps.DirectionsService();
    let pickupLatLng = null;
    let dropLatLng = null;

    map.addListener("click", (event) => {
        if (!pickupLatLng) {
            pickupLatLng = event.latLng;
            pickupMarker.setPosition(pickupLatLng);
            pickupInput.value = `${pickupLatLng.lat()}, ${pickupLatLng.lng()}`;

            // Reverse geocoding to get the name of the pickup location
            geocoder.geocode({ location: pickupLatLng }, (results, status) => {
                if (status === "OK" && results[0]) {
                    pickupInput.value = results[0].formatted_address; // Set the name of the pickup location
                } else {
                    alert("Location name could not be determined.");
                }
            });
        } else {
            dropLatLng = event.latLng;
            dropMarker.setPosition(dropLatLng);
            dropInput.value = `${dropLatLng.lat()}, ${dropLatLng.lng()}`;

            // Reverse geocoding to get the name of the drop location
            geocoder.geocode({ location: dropLatLng }, (results, status) => {
                if (status === "OK" && results[0]) {
                    dropInput.value = results[0].formatted_address; // Set the name of the drop location

                    console.log("Address Named");
                    console.log(dropInput.value);
                    console.log(pickupInput.value);
                    // Calculate distance if both markers are set
                    if (pickupLatLng && dropLatLng) {
                        directionsService.route(
                            {
                                origin: pickupInput.value,
                                destination: dropInput.value,
                                travelMode: "DRIVING",
                            },
                            async (result, status) => {
                                if (status === "OK") {
                                    // directionsRenderer.current.setDirections(result.request);
                                    const distance = result.routes[0].legs[0].distance.text;
                                    distanceInput.value = distance;
                                    console.log("distance "+distance);
                                }
                            }
                        );

                    }
                } else {
                    alert("Location name could not be determined.");
                }
            });
        }
    });

}
