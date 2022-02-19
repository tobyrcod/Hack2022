startlat = -1.584512
startlong = 54.775413

function coordToPostCode(Lat, Long){
    const Http = new XMLHttpRequest();
    const url=`https://findthatpostcode.uk/points/${Long},${Lat}`
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange=e=>{
        JSONobj = JSON.parse(Http.responseText)
        postcode = JSONobj.data.relationships.nearest_postcode.data.id
        
        return(postcode)
    }
}

coordToPostCode(startlat, startlong)