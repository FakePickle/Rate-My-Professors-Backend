from django.shortcuts import render, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pyrebase
# Create your views here.

config = {
    "apiKey": "AIzaSyDfr3RBbHBwZL6NM2qbT8nO73X8HLIOgWA",
    "authDomain": "rate-my-professor-92736.firebaseapp.com",
    "databaseURL": "https://rate-my-professor-92736-default-rtdb.firebaseio.com",
    "projectId": "rate-my-professor-92736",
    "storageBucket": "rate-my-professor-92736.appspot.com",
    "messagingSenderId": "166096274125",
    "appId": "1:166096274125:web:c1a1d3d3a2400258175f84",
    "measurementId": "G-5LYS9F8PBX"
}
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
database = firebase.database()

def index(request):
    
    name = database.child('Professors').child('ABC100000').child('Name').get().val()
    print(name)
    return HttpResponse(name)

@api_view(['POST', 'GET'])
def check(request):
    if request.method == 'POST':
        print("found",request.data)
        return Response(request.data)
    else:
        return Response({"detail": "No request found"})