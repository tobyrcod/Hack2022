function coordToPostCode(Lat, Long){
    const Http = new XMLHttpRequest();
    const url=`https://findthatpostcode.uk/points/${Long},${Lat}`
    Http.open("GET", url, false);
    Http.send();

    if(Http.status === 200){
        JSONobj = JSON.parse(Http.responseText)
        postcode = JSONobj.data.relationships.nearest_postcode.data.id

        return(postcode)
    }
}