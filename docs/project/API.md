## API ##

* Angularfire2
    * auth
    * list
    * object





## API ##
Hint: Watch out singular and plural
* GET /articles: Returns a list of articles
    * [HHE OK] Query-Parameter "anywhere=": Searches (caseinsensitive) the given string in the title and the description (not the tags or comments)
    * [NOT YET] Query-Parameter "content=": Articles with the content in title or description
    * [NOT YET] Query-Parameter "tags=": Articles with at least one of the given tags
    * [NOT YET] Query-Parameter "user=": Articles for the given users
    * [NOT YET] Query-Parameter "dateFrom=": Articles newer than the given date
    * [NOT YET] Query-Parameter "dateTo=": Articles older than the given date
    * [NOT YET] Query-Parameter "orderBy=": Property, by which the articles shall be ordered
    * [NOT YET] Query-Parameter "orderDirection=": Ascending oder descending order
* [HHE OK] POST /article: Posts a new article
* [HHE OK] GET /article/13: Returns article with the id 13
* [HHE OK] PUT /article/13: Updates an article with a new entity
* [HHE OK] DELETE /article/13: Deletes the article
* [HHE OK] GET /article/13/tags: Returns the list of tags for the article
* [HHE OK] GET /article/13/comments: Returns the comments for the articles
    * [NOT YET] Query-Parameter: user, dateFrom, dateTo, orderBy, oderDirection like from articles
* [HHE OK] GET /article/13/comment/432: Returns a single comment
* [HHE OK] POST /article/13/comment: Adds a new comment to the article
* PUT /article/13/comment/432: Updates a given single comment
* DELETE /article/13/comment/432: Updates a given single comment
* GET /article/13/user: Returns the user that submitted the article
* POST /article/13/votes/user/534: Adds a new vote to the article for the given user
* GET /article/13/votes/user/534: Returns the vote of the given user
* [HHE OK] PUT /article/13/votes/user/534: Updates the vote of the given user
* [HHE OK] Authentication
    * POST /api/authentication/ : Payload (application/json) { userName: ccc, password: xxx (encrypted mit bycrtpjs, hash = 8)} result bei NOK: 401, bei ok: 200 mit user class
        * Currently, password may NOT be encrypted
        * Method will return a token, that must be added to the HTTP Header "Authorization" with the value "Bearer {token}". Note: space between Bearer and effective token
        * express-jwt will add req.user object to the request with the information.
        * Sample Token: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlck5hbWUiOiJoaGUiLCJuYW1lIjoiaGV5bWFubnMiLCJmaXJzdG5hbWUiOiJob2xnZXIiLCJwYXNzd29yZCI6IiQyYSQwOCQxcklVZ0ZQYk1sTW9qSzNSMEh5bjMucWZZbkJVNTU3N2g1OUEvQnNqMFVHYUV3TEJFNTRrVyIsImFjdGl2ZSI6dHJ1ZSwiaWF0IjoxNDE1NTM0MDA2LCJleHAiOjE0MTU1Mzc2MDZ9.XllFCuY6hlEurBsuPER80nOZ0PWI60pkfMdaMDkmgaM
        * siehe link http://www.kdelemme.com/2014/03/09/authentication-with-angularjs-and-a-node-js-rest-api/ var token = jwt.sign(user, secret.secretToken, { expiresInMinutes: 60 });
    * [HHE OK] GET /api/user/:id/: Return des Users
    * [HHE OK] POST /api/users/ : Payload {Payload (application/json) { userName: ccc, name:, firstname;, password: xxx } return: 201, mit user class
    * [HHE OK] PUT /api/user/:id/: Update vom User, return neuer user
    * [HHE OK] DELETE /api/user/:id/: Löschen vom User (setzt active = false); gibt nichts zurück
    * [HHE OK] GET /api/users?username=xxx returns a list of matching user 
    
    
PUT /users/{uid}.json {name: email} - generate or update user meta data
GET /users/{uid}.json - retrieve user meta data


GET    /users    - Retrieves a list of users
GET    /users/12 - Retrieves a specific user
POST   /users    - Creates a new user
PUT    /users/12 - Updates user #12
PATCH  /users/12 - Partially updates user #12
DELETE /users/12 - Deletes user #12

GET    /users/12/patients    - Retrieves a list of patients of user #12
GET    /users/12/patients/5  - Retrieves a patient #5 of user #12
POST   /users/12/patients    - Creates a new patient for user #12
PUT    /users/12/patients/3  - Updates patient #3 of user #12
PATCH  /users/12/patients/3  - Partially updates patient #3 of user #12
DELETE /users/12/patients/3  - Deletes patient #3 of user #12


# http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
GET     /tickets               - Retrieves a list of tickets
GET     /tickets/12            - Retrieves a specific ticket
POST    /tickets               - Creates a new ticket
PUT     /tickets/12            - Updates ticket #12
PATCH   /tickets/12            - Partially updates ticket #12
DELETE  /tickets/12            - Deletes ticket #12
GET     /tickets/12/messages   - Retrieves list of messages for ticket #12
GET     /tickets/12/messages/5 - Retrieves message #5 for ticket #12
POST    /tickets/12/messages   - Creates a new message in ticket #12
PUT     /tickets/12/messages/5 - Updates message #5 for ticket #12
PATCH   /tickets/12/messages/5 - Partially updates message #5 for ticket #12
DELETE  /tickets/12/messages/5 - Deletes message #5 for ticket #12

- SSL always: One thing to watch out for is non-SSL access to API URLs. Do not redirect these to their SSL counterparts. Throw a hard error instead
