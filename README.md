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

### CURL wiki
#### Guest available endpoints
- login
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username": "new", "password": "new"}' \
  http://localhost:8000/token/
```
- register
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username": "new", "email": "a@a.pl", "password": "new"}' \
  http://localhost:8000/register/
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
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI1NDk4ODAxLCJqdGkiOiIzN2M3NDA0NjliYzE0NTg2OTBiOTUyM2Q4Y2JjNDZmYyIsInVzZXJfaWQiOjR9.HCEJ7TlkcUO7gace1b66_EcCIRwHnVTO_N8IAxNPfcM" \
  -d '{"title": "Room in city center", "price": "900", "area": "30", "location": "Dominikanski Square", "building_features": "modern building;2nd floor;elevator available;peaceful neigborhood", "flat_features": "fully furnitured;two bathrooms;kitchen;living room", "flatmates_features": "2 students;parties on weekend;interested in electrical engeneering", "rules":"No smoking;No pets", "phone":"123456789"}' \
  http://localhost:8000/user_room_detail/
```
- delete room offer
```bash
curl \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI1NDk4ODAxLCJqdGkiOiIzN2M3NDA0NjliYzE0NTg2OTBiOTUyM2Q4Y2JjNDZmYyIsInVzZXJfaWQiOjR9.HCEJ7TlkcUO7gace1b66_EcCIRwHnVTO_N8IAxNPfcM" \
  -d '{"id":"2"}' \
  http://localhost:8000/user_room_detail/
```
- modify room offer
```bash
curl \
  -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI1NDk4ODAxLCJqdGkiOiIzN2M3NDA0NjliYzE0NTg2OTBiOTUyM2Q4Y2JjNDZmYyIsInVzZXJfaWQiOjR9.HCEJ7TlkcUO7gace1b66_EcCIRwHnVTO_N8IAxNPfcM" \
  -d '{"id": "2", "title": "Room in city center", "price": "1900", "area": "30", "location": "Dominikanski Square", "building_features": "modern building;2nd floor;elevator available;peaceful neigborhood", "flat_features": "fully furnitured;two bathrooms;kitchen;living room", "flatmates_features": "2 students;parties on weekend;interested in electrical engeneering", "rules":"No smoking;No pets", "phone":"123456789"}' \
  http://localhost:8000/user_room_detail/
```
- get user's room offers
```bash
curl \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI1NDk4ODAxLCJqdGkiOiIzN2M3NDA0NjliYzE0NTg2OTBiOTUyM2Q4Y2JjNDZmYyIsInVzZXJfaWQiOjR9.HCEJ7TlkcUO7gace1b66_EcCIRwHnVTO_N8IAxNPfcM" \
  http://localhost:8000/user_room_list/
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
