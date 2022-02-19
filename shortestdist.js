function getDist(sLat, sLong, eLat, eLong){
    const Http = new XMLHttpRequest();
    const url=`http://router.project-osrm.org/route/v1/car/${sLat},${sLong};${eLat},${eLong}?overview=false`
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange=e=>{
        JSONobj = JSON.parse(Http.responseText)
        distance = JSONobj.routes[0].legs[0].distance
        return(distance)
    }
}