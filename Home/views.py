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
        return Response({"detail": "This is check function"})
    
@api_view(['POST', 'GET'])
def login(request):
    Validation = {'status':'invalid'}

    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = auth.sign_in_with_email_and_password(email,password)
            Validation['status'] = 'valid'
        except:
            Validation['status'] = 'invalid'

    else:
        return Response(Validation)
    return Response({"detail": "No request found"})


@api_view(['POST', 'GET'])
def signup(request):
    Registration = {'status':'true'}

    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        print(email," ",password)
        try:
            user = auth.create_user_with_email_and_password(email,password)
            Registration['status'] = 'true'
            return Response(Registration)
        except:
            Registration['status'] = 'true'
            return Response(Registration)

    else:
        return Response(Registration)
    
    return Response({"detail": "No request found"})
    