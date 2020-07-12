# finder
App for finding student quarters and flatmates



### Flow

###### Landing page (flats):

- **Find mates** - redirect to FindMates
- **Add offer** - redirect to Login/Register,  to adding form when logged
- **My account** - redirect to Login/Register, to panel when logged

TODO:

- scroll vs popup
- map?
- captcha in register
- detail - 'blurring' not active photos - like in https://www.immowelt.de/expose/2ubvz4y?bc=13
- filter by features?
- connection between sites - sugestion of rooms in flatmate app
- common account panel for both sites
- favourite section in user account
- forgot password, mail verification?

### CURL wiki
#### Guest available endpoints
- register
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username": "new", "email": "a@a.pl", "password": "new"}' \
  http://localhost:8000/register/
```
- login
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username": "new", "password": "new"}' \
  http://localhost:8000/token/
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
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MTA1ODk5LCJqdGkiOiIzNGYxZjUxODc1NDY0NGQ5OGQxOTQ1Y2I5ZGIyYjFkNiIsInVzZXJfaWQiOjJ9.frlIciCMHygIGOiWDEeYkhJCzJLnbO2vAqae-ZgO72c" \
  -d '{"title": "Room in city center", "price": "900", "area": "30", "location": "Dominikanski Square", "building_features": "modern building;2nd floor;elevator available;peaceful neigborhood", "flat_features": "fully furnitured;two bathrooms;kitchen;living room", "flatmates_features": "2 students;parties on weekend;interested in electrical engeneering", "rules":"No smoking;No pets", "phone":"123456789"}' \
  http://localhost:8000/user_room_detail/
```
- delete room offer
```bash
curl \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MTA1ODk5LCJqdGkiOiIzNGYxZjUxODc1NDY0NGQ5OGQxOTQ1Y2I5ZGIyYjFkNiIsInVzZXJfaWQiOjJ9.frlIciCMHygIGOiWDEeYkhJCzJLnbO2vAqae-ZgO72c" \
  -d '{"id":"2"}' \
  http://localhost:8000/user_room_detail/
```
- modify room offer
```bash
curl \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MTA1ODk5LCJqdGkiOiIzNGYxZjUxODc1NDY0NGQ5OGQxOTQ1Y2I5ZGIyYjFkNiIsInVzZXJfaWQiOjJ9.frlIciCMHygIGOiWDEeYkhJCzJLnbO2vAqae-ZgO72c" \
  -d '{"id": "2", "title": "Room in city center", "price": "1900", "area": "30", "location": "Dominikanski Square", "building_features": "modern building;2nd floor;elevator available;peaceful neigborhood", "flat_features": "fully furnitured;two bathrooms;kitchen;living room", "flatmates_features": "2 students;parties on weekend;interested in electrical engeneering", "rules":"No smoking;No pets", "phone":"123456789"}' \
  http://localhost:8000/user_room_detail/
```
- get user's room offers
```bash
curl \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MTA1ODk5LCJqdGkiOiIzNGYxZjUxODc1NDY0NGQ5OGQxOTQ1Y2I5ZGIyYjFkNiIsInVzZXJfaWQiOjJ9.frlIciCMHygIGOiWDEeYkhJCzJLnbO2vAqae-ZgO72c" \
  http://localhost:8000/user_room_list/
```

- add room offer to user's fav
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MTA1ODk5LCJqdGkiOiIzNGYxZjUxODc1NDY0NGQ5OGQxOTQ1Y2I5ZGIyYjFkNiIsInVzZXJfaWQiOjJ9.frlIciCMHygIGOiWDEeYkhJCzJLnbO2vAqae-ZgO72c" \
  -d '{"id": "1"}' \
  http://localhost:8000/add_room_offer_to_liked/ -v
```

- get user's fav room offers
```bash
curl \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MTA1ODk5LCJqdGkiOiIzNGYxZjUxODc1NDY0NGQ5OGQxOTQ1Y2I5ZGIyYjFkNiIsInVzZXJfaWQiOjJ9.frlIciCMHygIGOiWDEeYkhJCzJLnbO2vAqae-ZgO72c" \
  http://localhost:8000/get_liked_room_offers/ -v
```
- add mate offer
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MTA1ODk5LCJqdGkiOiIzNGYxZjUxODc1NDY0NGQ5OGQxOTQ1Y2I5ZGIyYjFkNiIsInVzZXJfaWQiOjJ9.frlIciCMHygIGOiWDEeYkhJCzJLnbO2vAqae-ZgO72c" \
  -d '{"title": "Peaceful IT student", "age": "22", "location": "Grunwaldzki Square", "field_of_study": "Computer science", "features":"peaceful;quiet;gaming;cycling", "customs": "no smoking;no partying;wakes up at 11-12;goes to bed 23-24", "phone":"123456789"}' \
  http://localhost:8000/user_mate_detail/
```
- delete mate offer
```bash
curl \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MTA1ODk5LCJqdGkiOiIzNGYxZjUxODc1NDY0NGQ5OGQxOTQ1Y2I5ZGIyYjFkNiIsInVzZXJfaWQiOjJ9.frlIciCMHygIGOiWDEeYkhJCzJLnbO2vAqae-ZgO72c" \
  -d '{"id":"1"}' \
  http://localhost:8000/user_mate_detail/
```
- modify mate offer
```bash
curl \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MTA1ODk5LCJqdGkiOiIzNGYxZjUxODc1NDY0NGQ5OGQxOTQ1Y2I5ZGIyYjFkNiIsInVzZXJfaWQiOjJ9.frlIciCMHygIGOiWDEeYkhJCzJLnbO2vAqae-ZgO72c" \
  -d '{"id":"3", "title": "Peaceful IT student", "age": "20", "location": "Grunwaldzki Square", "field_of_study": "Computer science", "features":"peaceful;quiet;gaming;cycling", "customs": "no smoking;no partying;wakes up at 11-12;goes to bed 23-24", "phone":"123456789"}' \
  http://localhost:8000/user_mate_detail/
```

- get user's mate offers
```bash
curl \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MTA1ODk5LCJqdGkiOiIzNGYxZjUxODc1NDY0NGQ5OGQxOTQ1Y2I5ZGIyYjFkNiIsInVzZXJfaWQiOjJ9.frlIciCMHygIGOiWDEeYkhJCzJLnbO2vAqae-ZgO72c" \
  http://localhost:8000/user_mate_list/
```

- add mate offer to user's fav
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MTA1ODk5LCJqdGkiOiIzNGYxZjUxODc1NDY0NGQ5OGQxOTQ1Y2I5ZGIyYjFkNiIsInVzZXJfaWQiOjJ9.frlIciCMHygIGOiWDEeYkhJCzJLnbO2vAqae-ZgO72c" \
  -d '{"id": "1"}' \
  http://localhost:8000/add_mate_offer_to_liked/ -v
```

- get user's fav mate offers
```bash
curl \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MTA1ODk5LCJqdGkiOiIzNGYxZjUxODc1NDY0NGQ5OGQxOTQ1Y2I5ZGIyYjFkNiIsInVzZXJfaWQiOjJ9.frlIciCMHygIGOiWDEeYkhJCzJLnbO2vAqae-ZgO72c" \
  http://localhost:8000/get_liked_mate_offers/ -v
```

- send message to other user
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2MTA1ODk5LCJqdGkiOiIzNGYxZjUxODc1NDY0NGQ5OGQxOTQ1Y2I5ZGIyYjFkNiIsInVzZXJfaWQiOjJ9.frlIciCMHygIGOiWDEeYkhJCzJLnbO2vAqae-ZgO72c" \
  -d '{"receiver": "3", "subject": "Room in city center", "content": "Hi. Can I see that room tomorrow?"}' \
  http://localhost:8000/send_message/

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
