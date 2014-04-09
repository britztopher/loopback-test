//CREATE A USER FOR LOGGING IN WITH

To recreate issue perform the following tasks:

1. start up mongo
2. npm install 
3. node app.js
4. navigate to localhost:3000
5. run curl command:
    a). curl -X POST -H "Content-Type:application/json" -d '{"email": "test@test.com", "password": "test"}' http://localhost:3000/api/users
6. login with user just create with curl command
7. Once logged in click the "Get Error" Button
8. This should return the correct information and display it
9. Change ACL for the "test_authorization" remote method on the customer class to Role.AUTHENTICATED like so:
    
     acls: [
        {
            principalType: ACL.ROLE,
            principalId: Role.AUTHENTICATED,
            permission: ACL.ALLOW,
            property: 'test_authorized'    // evaluate
        }
    ]

10. restart application 
11. refresh home page
12. Click "Get Error" button again
13. Results are 401 Unauthorized even though the token is within the header and being checked
