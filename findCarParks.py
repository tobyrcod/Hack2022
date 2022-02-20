from operator import index
from turtle import distance
from xml.etree.ElementTree import Element
import requests
import json
import math

jason_path = "data.json"

def postcodeToCoord(postcode):
    postcode = postcode.replace(" ", "")
    url = f"https://findthatpostcode.uk/postcodes/{postcode}"
    coords = requests.get(url).json()
    lat = coords["data"]["attributes"]["location"]["lat"]
    lon = coords["data"]["attributes"]["location"]["lon"]

    return [lat, lon]

def calculateDrivingDistance(sLat, sLon, eLat, eLon):
    url = f'http://router.project-osrm.org/route/v1/driving/{sLon},{sLat};{eLon},{eLat}?overview=false'
    dist_json = requests.get(url).json()
    dist = dist_json["routes"][0]["legs"][0]["distance"]
    return dist

def calculateDirectDistance(sLat, sLon, eLat, eLon):
    change_lat = eLat - sLat
    change_lon = eLon - sLon

    dist = math.sqrt(change_lat**2 + change_lon**2) * 111

    return dist

[lat1, lon1] = postcodeToCoord("DH13LD")
[lat2, lon2] = postcodeToCoord("DH13LJ")

calculateDrivingDistance(lat1, lon1, lat2, lon2)

nearby_car_parks = []
driving_distances = []

with open(jason_path, "r+") as infile:
    car_parks_json = json.load(infile)
    input_postcode = input("Enter the postcode you are going to: ")
    [sLat, sLon] = postcodeToCoord(input_postcode)
    for element in car_parks_json:
        lat = float(element["LAT"])
        lon = float(element["LONG"])

        if calculateDirectDistance(lat, lon, sLat, sLon) < 3:
            driving_dist = calculateDrivingDistance(lat, lon, sLat, sLon)
            nearby_car_parks.append(element)
            driving_distances.append(driving_dist)
            driving_distances_sorted = sorted(driving_distances)

result_list = [i for _,i in sorted(zip(driving_distances,nearby_car_parks))]   


calculateDirectDistance(lat1, lon1, lat2, lon2)

i = 0

for element in result_list:
    print()
    print("Name: " + element["Carpark_Name"])
    print("Postcode: " + element["Postcode"])
    print("Paid/Free: " + element["Carpark_Name"])
    print("Paid/Free: " + element["Description"])
    print("Driving distance: " + str(round(driving_distances_sorted[i]/10)/100) + " km")
    print()

    i += 1