
//CREATE A USER FOR LOGGING IN WITH
curl -X POST -H "Content-Type:application/json" -d '{"email": "test@test.com", "password": "test"}' http://localhost:3000/api/users