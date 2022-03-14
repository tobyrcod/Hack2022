function postcodeToCoord(postCode){

    postCode = postCode.replace(" ", "+")
    const Http = new XMLHttpRequest();
    const url=`https://findthatpostcode.uk/postcodes/${postCode}`
    Http.open("GET", url, false);
    Http.send();

    if(Http.status === 200){
        JSONobj = JSON.parse(Http.responseText)
        latitude = JSONobj.data.attributes.location.lat
        longitude = JSONobj.data.attributes.location.lon
        
        return(latitude, longitude)
    }
}