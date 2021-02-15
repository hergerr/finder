# finder
App for finding student quarters. Project made in purpose of learning RESTful design and SPA client applications.


### Tech stack
- Django
- React
- PostgreSQL

### CURL wiki
#### Guest available endpoints
- register
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username": "asdasdasd", "password": "gjkfnjkgfnjkgnfjk", "password_confirm":"gjkfnjkgfnjkgnfjk", "email":"a@niepodam.pl"}' \
  http://localhost:8000/accounts/register/

```
- confirm registration (data from querystring in email)
```
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id": "20", "timestamp": "1597593269", "signature":"Xd8dSaNRBD1cUAONlw_VkxWcInE"}' \
  http://localhost:8000/accounts/verify-registration/
```
- login
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username": "new", "password": "new"}' \
  http://localhost:8000/token/
```
- reset password
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"login": "gad"}' \
  http://localhost:8000/accounts/send-reset-password-link/
```

- change password (data from querysting in email)
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"password": "asdasdasddas", "user_id": "20", "timestamp": "1597594109", "signature":"pZlA01E8QArtz7IJwcHgH80PRzw"}' \
  http://localhost:8000/accounts/reset-password/
```

- get all room offers (list view)
```bash
curl \
  -X GET \
  -H "Content-Type: application/json" \
  http://localhost:8000/all_room_offers_list/
```

- get room offer detail
```bash
curl \
  -X GET \
  -H "Content-Type: application/json" \
  http://localhost:8000/room_offer_detail/3
```

- get all mates offer
```bash
curl \
  -X GET \
  -H "Content-Type: application/json" \
  http://localhost:8000/all_mate_offers_list/
```

#### User available endpoints
- add room offer
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  -d '{"title": "Room in city center", "price": "900", "area": "30", "location": "Dominikanski Square", "building_features": "modern building;2nd floor;elevator available;peaceful neigborhood", "flat_features": "fully furnitured;two bathrooms;kitchen;living room", "flatmates_features": "2 students;parties on weekend;interested in electrical engeneering", "rules":"No smoking;No pets", "phone":"123456789"}' \
  http://localhost:8000/user_room_detail/
```
- delete room offer
```bash
curl \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  -d '{"id":"2"}' \
  http://localhost:8000/user_room_detail/
```
- modify room offer
```bash
curl \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  -d '{"id": "2", "title": "Room in city center", "price": "1900", "area": "30", "location": "Dominikanski Square", "building_features": "modern building;2nd floor;elevator available;peaceful neigborhood", "flat_features": "fully furnitured;two bathrooms;kitchen;living room", "flatmates_features": "2 students;parties on weekend;interested in electrical engeneering", "rules":"No smoking;No pets", "phone":"123456789"}' \
  http://localhost:8000/user_room_detail/
```
- get user's room offers
```bash
curl \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  http://localhost:8000/user_room_list/
```

- add room offer to user's fav
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  -d '{"id": "1"}' \
  http://localhost:8000/add_room_offer_to_liked/ -v
```

- get user's fav room offers
```bash
curl \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  http://localhost:8000/get_liked_room_offers/ -v
```

- delete user's fav room offer
```bash
 curl \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  -d '{"id": "1"}' \
  http://localhost:8000/delete_liked_room_offer/ -v
```

- add mate offer
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  -d '{"title": "Peaceful IT student", "age": "22", "location": "Grunwaldzki Square", "field_of_study": "Computer science", "features":"peaceful;quiet;gaming;cycling", "customs": "no smoking;no partying;wakes up at 11-12;goes to bed 23-24", "phone":"123456789"}' \
  http://localhost:8000/user_mate_detail/

  # with photo

  curl \
  -X POST \
  -i -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk"  \
  -F "title=Peaceful IT student" -F "age=22" -F "location=Grunwaldzki Square" -F "field_of_study=Computer science" -F "features=peaceful;quiet;gaming;cycling" -F "customs=no smoking;no partying;wakes up at 11-12;goes to bed 23-24" -F "phone=123456789" -F "image=@/home/tymek/Downloads/117423304_2349618858677882_3226012051360263266_n.jpg" http://localhost:8000/user_mate_detail/
```
- delete mate offer
```bash
curl \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  -d '{"id":"1"}' \
  http://localhost:8000/user_mate_detail/
```
- modify mate offer
```bash
curl \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  -d '{"id":"3", "title": "Peaceful IT student", "age": "20", "location": "Grunwaldzki Square", "field_of_study": "Computer science", "features":"peaceful;quiet;gaming;cycling", "customs": "no smoking;no partying;wakes up at 11-12;goes to bed 23-24", "phone":"123456789"}' \
  http://localhost:8000/user_mate_detail/
```

- get user's mate offers
```bash
curl \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  http://localhost:8000/user_mate_list/
```

- add mate offer to user's fav
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  -d '{"id": "1"}' \
  http://localhost:8000/add_mate_offer_to_liked/ -v
```

- get user's fav mate offers
```bash
curl \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  http://localhost:8000/get_liked_mate_offers/ -v
```

- delete user's fav mate offer
```bash
 curl \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  -d '{"id": "1"}' \
  http://localhost:8000/delete_liked_mate_offer/ -v
```


- send message to other user
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  -d '{"receiver": "3", "subject": "Room in city center", "content": "Hi. Can I see that room tomorrow?"}' \
  http://localhost:8000/send_message/

```

- send message using id
```bash
curl \
    -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  -d '{"id": "1", "content": "Hi. Can I see that room tomorrow?"}' \
  http://localhost:8000/send_message_conv_id/
```

- get conversation
```bash
curl \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  http://localhost:8000/get_conversation/1
```

- get user's conversations
```bash
curl \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  http://localhost:8000/get_user_conversations/
```

- delete given conversation
```bash
curl \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NDI3MDg3LCJqdGkiOiI1ZWM4N2E4YWY3NWM0ZDZkYjE3YWJlNzY4ODIwM2YyMCIsInVzZXJfaWQiOjF9.vZ61ur3AYGDt3zHhg1c62FKTBDiOSE-U6pRXFL5AIAk" \
  http://localhost:8000/delete_conversation/6/
```

### Development wiki
#### Postgres
- getting in postgres db
```bash
docker exec -it finder_db_1 psql -U finder -d finderdb
```
- listing tables
```bash
\dt
```
- list table content
```sql
select * from auth_user;
```
- NGINX SERWUJE Z HOSTA, NIE Z DOCKERA, zatem po aktulizacji koniecznie trzeba zbudować pliki do serwowania lokalnie
### JWT
- explanations:
https://stackoverflow.com/a/40376819/12422260

### Maybe useful next time
```python
https://stackoverflow.com/questions/2218327/django-manytomany-filter
data = Conversation.objects.filter(members__in=[owner, second_member], subject=request.data['subject']).distinct().first()
```
