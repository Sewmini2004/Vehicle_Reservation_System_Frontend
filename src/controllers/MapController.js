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
