# Identity Reconciliation

Links distinct datapoints to a single entity. (Used by almost all big techs using customer data)

## Usage

Request:
```
POST http://localhost:3000/identify
content-type: application/json

{
    "email": String,
    "phoneNumber": String
}
```

Response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Connection: close

{
  "contact": {
    "primaryContatctId": Int,
    "emails": [String],
    "phoneNumbers": [String],
    "secondaryContactIds": [Int]
  }
}

```

## Local deployment

- Install packages: `npm install`
- Create a .env file:
```
MYSQL_USER=""
MYSQL_PASSWORD=""
MYSQL_HOST=""
```
- Start the server: `npm start`

@MIT <3