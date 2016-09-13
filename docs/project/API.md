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