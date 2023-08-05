from django.shortcuts import render
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
        try:
            Reviews = database.child('test').child('0bc15110-b882-44d4-8277-c2f52d00ca17').child('Reviews').get()
            tags_List = database.child('test').child('0bc15110-b882-44d4-8277-c2f52d00ca17').child('Tags').get()
            top_tags = []
            review_ids = []
            ProfReviews = []
            Difficulty =  database.child('test').child('0bc15110-b882-44d4-8277-c2f52d00ca17').child('Difficulty').get().val()
            Rating = database.child('test').child('0bc15110-b882-44d4-8277-c2f52d00ca17').child('Rating').get().val()
            if Reviews.each():
                review_ids = [review.key() for review in Reviews.each()]

            tags = []
            if tags_List.each():
                for t in tags_List.each():
                    if int(t.val()) != 0:
                        tag_data = [t.key(), t.val()]
                        tags.append(tag_data)

            tags.sort(key=lambda x: x[1], reverse=True)
            for i in range(0, 5):
                if i >= len(tags):
                    break
                top_tags.append(tags[i][0])

            for i in review_ids:
                R = database.child('Reviews').child(i).get()
                Review_Dict = {}
                for j in R.each():
                    Review_Dict[j.key()] = j.val()
                ProfReviews.append(Review_Dict)

            return Response({'Reviews' : ProfReviews,'Tags' : top_tags, 'Difficulty' : Difficulty, 'Rating' : Rating}) 
        except Exception as e:
            print(e)
            return Response({'status': 'Error', 'message': str(e)})
   
        
@api_view(['POST', 'GET'])
def Search_Prof(request):
    if request.method == 'POST':
        profName = request.data.get('profName')
        profName = profName.split(" ")
        prof_list = []

        try:
            data = database.child('Professors').get()  
            for id in data.each():  
                professor = {}
                name = id.val().get('Name')
                name = name.split(" ")
                flag = True
                if len(name) >= len(profName):
                    for i in range(0, len(profName)):
                        if profName[i].lower() != name[i].lower():
                            flag = False
                            break
                if flag:
                    professor['Id'] = id.key()
                    professor['Name'] = id.val().get('Name')
                    professor['School'] = id.val().get('School Name')
                    professor['difficulty'] = id.val().get('Difficulty')
                    professor['rating'] = 4.5
                    professor['noOfRatings'] = 15
                    professor['dept'] = "cs"
                    prof_list.append(professor)
            return Response(prof_list)
        
        except Exception as e:
            print(e)
            return Response({'status': 'No Data Found'})
