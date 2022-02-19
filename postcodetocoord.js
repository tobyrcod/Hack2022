postCode = "DH1 3YJ"

function postcodeToCoord(postCode){
    postCode = postCode.replace(" ", "+")
    const Http = new XMLHttpRequest();
    const url=`https://findthatpostcode.uk/postcodes/${postCode}`
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange=e=>{
        JSONobj = JSON.parse(Http.responseText)
        latitude = JSONobj.data.attributes.location.lat
        longitude = JSONobj.data.attributes.location.lon
        
        return(latitude, longitude)
    }
}

postcodeToCoord(postCode)