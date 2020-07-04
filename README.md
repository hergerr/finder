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
- login
```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin"}' \
  http://localhost:8000/token/
```
