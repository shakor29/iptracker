
var map = L.map('map').setView([45.166666, 15.499998], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([45.166666, 15.499998]).addTo(map)
    
document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';//removes leaflet attribution in bottom right corner

/* L.control.zoom({
    position: 'bottomright'
}).addTo(map); */

map.zoomControl.setPosition('bottomright'); 

//update marker
updateMarker = (update_marker = [45.166666, 15.499998]) => {
    map.setView(update_marker, 6);
    L.marker(update_marker).addTo(map)
}



//IPIFY

//pull from different file
const secret_api = 'your api key'
const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'
const api_uri = 'https://geo.ipify.org/api/'
let current_version = 'v1'

//elements to update
let ipOutput = document.getElementById('ipOutput')
let locationOutput = document.getElementById('locationOutput')
let timezoneOutput = document.getElementById('timezoneOutput')
let ispOutput = document.getElementById('ispOutput')

//form elements
const entered_ip = document.getElementById('ip_address')
const search_btn = document.getElementById('input-btn-a')

//elems

//api header
const headers_option = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}

//get ip details
getIPDetails = (default_ip) => {
    if(default_ip == undefined){
        var ip_uri = `${bypass_cors_url}${api_uri}${current_version}?apiKey=${secret_api}`
    }
    else{
       var ip_uri = `${bypass_cors_url}${api_uri}${current_version}?apiKey=${secret_api}&ipAddress=${default_ip}`
    }
    fetch(ip_uri, headers_option)
    .then(results => results.json())
    .then(data => {
        ipOutput.innerHTML = data.ip
        locationOutput.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
        timezoneOutput.innerHTML = data.location.timezone
        ispOutput.innerHTML = data.ispOutput

        //update map marker
        updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error => {
        alert("Unable to get IP details")
        console.log(error);
    })
}

document.addEventListener('load', updateMarker())

search_btn.addEventListener('click', e => {
    e.preventDefault()
    if (entered_ip.value != '' && entered_ip.value != null){
        getIPDetails(entered_ip.value)
        entered_ip.value = ''
        return
    }else{
        entered_ip.value = ''
        alert("Please enter a valid IP address")
    }
})
