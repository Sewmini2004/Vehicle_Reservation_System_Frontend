export function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 6.9271, lng: 79.8612 }, // Default center (Colombo, Sri Lanka)
        zoom: 12,
    });

    const pickupInput = document.getElementById("pickupLocation");
    const dropInput = document.getElementById("dropLocation");

    const pickupMarker = new google.maps.Marker({ map });
    const dropMarker = new google.maps.Marker({ map });

    map.addListener("click", (event) => {
        if (!pickupInput.value) {
            pickupMarker.setPosition(event.latLng);
            pickupInput.value = `${event.latLng.lat()}, ${event.latLng.lng()}`;
        } else {
            dropMarker.setPosition(event.latLng);
            dropInput.value = `${event.latLng.lat()}, ${event.latLng.lng()}`;
        }
    });
}







/*

export function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 6.9271, lng: 79.8612 }, // Default center (Colombo, Sri Lanka)
        zoom: 12,
    });

    const geocoder = new google.maps.Geocoder();

    const pickupInput = document.getElementById("pickupLocation");
    const dropInput = document.getElementById("dropLocation");

    const pickupHidden = document.getElementById("pickupCoordinates");
    const dropHidden = document.getElementById("dropCoordinates");

    const pickupMarker = new google.maps.Marker({ map });
    const dropMarker = new google.maps.Marker({ map });

    map.addListener("click", (event) => {
        const latLng = event.latLng;

        geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === "OK" && results[0]) {
                const address = results[0].formatted_address;

                if (!pickupInput.value) {
                    pickupMarker.setPosition(latLng);
                    pickupInput.value = address; // Set the place name
                    pickupHidden.value = `${latLng.lat()}, ${latLng.lng()}`; // Store coordinates
                } else {
                    dropMarker.setPosition(latLng);
                    dropInput.value = address; // Set the place name
                    dropHidden.value = `${latLng.lat()}, ${latLng.lng()}`; // Store coordinates
                }
            } else {
                alert("Failed to get location name. Try again.");
            }
        });
    });
}
*/
