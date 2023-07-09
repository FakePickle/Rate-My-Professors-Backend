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

    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = auth.sign_in_with_email_and_password(email,password)            
            return Response({'status':'valid'})
        except Exception as e:
            print(str(e))
            return Response({'status':'invalid','message':str(e)})



@api_view(['POST', 'GET'])
def signup(request):

    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        print(email," ",password)
        try:
            user = auth.create_user_with_email_and_password(email,password)
            userID = user['localId']
            data = {userID:{'Email ID':email,'My reviews':'None'}}
            database.child('Users').update(data)
            return Response({'status':'true'})
        except Exception as e:
            print(e) 
            return Response({'status':'false','message':str(e)})
    
@api_view(['POST', 'GET'])
def Prof_review(request):
    if request.method == 'POST':
        profName = request.data.get('profName')
        collegeName = request.data.get('coolegeName')
        top_tags = []
        prof_review ={}
        try:
            data  = database.chld('Professors')
            for id in data:
                if data[id]['Name'] == profName and data[id]['School Name'] == collegeName:
                    tag = data[id]
                    tag.pop('Name')
                    tag.pop('School Name')
                    tag.pop('School ID')
                    tag.pop('Rating')
                    tag.pop('Difficulty')
                    sorted_tags = sorted(tag.items(), key = lambda x : x[1])
                    for i in range(0,5):
                        if sorted_tags[len(sorted_tags)-1-i][1] == 0:
                            break
                        top_tags.append(sorted_tags[len(sorted_tags)-1-i][0])
        except:
            return Response({'status':'No Data Found'})