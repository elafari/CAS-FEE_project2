## Application architecture and design
The .lnk web application consists of two functional areas:
* the user interface (or front end as we might say)
* the restful data transfer and handling

The front end consists of various static files and html partials that are served from the express server. The layout and 
handling is implemented with angular, that takes care of the routing stuff. Separation of concerns is accomplished using 
controllers that are responsible for the the interaction in the UI and layout details  and services that interact with
the backend to transfer data and listen on incoming web socket messages.

We modularized the application front end using various angular modules:
* controllers
    * addArticle-controller: functionality whe adding an article (i.e. sharing a .lnk)
    * articles-controller: controller for the collection of articles
    * article-controller: controller for a single article instance in the articles-loop. i.e. lacy loading of comments, handling up and down votes
    * comment-controller: controller for handling the comment(s) of the article: submitting a new comment, deleting the owners comments,...
    * login: controller handling login logic
    * navigation controller: well, for navigation purposes
    * userCreate-controller: handling creation of users
    * userUpdate-controller: updating the user resource

* services
    * article-service: interaction with the backend regarding articles and voting
    * authentication-service: interacting with the authentication api of the backend
    * behaviour-service: minor UI service
    * comment-service: interaction with the backend regarding comments
    * socket-factory: factory that creates the web socket listener
    * tokenInterceptor: Interception $http calls to enrich the call (http header) with the JSON web token
    * user-service: used when interacting with the user api of the backend
    
The bits and pieces are knit together in the app.js angular application file. using routes that assign html partials 
(views) the the ng-view part of the index.html and assign the basic controller. For single articles and the comments,
sub controllers (see above) are applied inside the loop (article) or a section of the partial (comments).

The comments of an article are realized as lazy loading. I.e. the user clicks on "Show comments" an just then the comments
are being fetched from the backend.

On the backend side like most web application, there are two functional distinct areas:
* serving static files
* serving data in a restful manner

The static files are served directly. We did not introduce a templating engine as with angular we're already using 
mechanisms for data binding, thus templating on the backend would not add much.
 
Serving the data we defined quite sam api routes seperated over some modules. The modules are:
* article
* authentication
* comments
* tags
* users

The article module consists of these components:
1. ArticleRouter: Assigns the middleware functions to the relevant URL parts and registers the param handler for the :articleId and :commentId parameter
* ArticleRouteModule: Provides the functions to handle selecting and inserting articles, votes, comments, and all the other things
* ArticleParamModule: Handles selecting a single article if the :articleId is present in the defined route
* ArticleRouterHelperModule: Some helper function exclusively for the article related functions

The authentication module consists of these components:
1. AuthenticationRouter: Assigns the middleware functions to the relevant URL parts regarding authentication
* AuthenticationRouterModule: Provides the functions to handle user authentication (i.e. simply checking the credentials and returning the jason web token if everything is ok

The comments module consists of these components
1. CommentParamHandler: Param handler registered in the ArticleRouter that handles selecting a specific comment when a :commentId is in the route
  
The tag module consists of these components:
1. TagRouter: Assigns the middleware functions to the relevant URL parts and registers the param handler for the :tagId parameter
* TagRouteModule: Provides the functions to handle selecting tags, a single tag and the articles with a given tag
* TagParamModule: Handles selecting a single article if the :articleId is present in the defined route

The user module consists of these components
1. UserRouter: Assigns the middleware functions to the relevant URL parts and registers the param handler for the :userId parameter
* UserRouteModule: Provides the functions to handle selecting and inserting users (not authenticating)
* UserParamModule: Handles selecting a single user if the :userId is present in the defined route

Persistence is handled separately and implemented without external dependencies:
* The CrudDatabaseFactory module provides basic CRUD functionality on a "in memory basis". i.e. with the implementation, 
all data is served from data structures that are held in memory. A very basic persistence functionality has been implemented: the internal structures are stored on the file system a JSON files
* The InMemorydataStore module provides the high level api to access data from within the router modules. It holds the various tables based on the CrudDatabaseFactory.
It ist also the responsibility of this module to handle the relationship between the tables. The persistence is based around the defined entities
(and thus realizes an relational database functionality and a crude schema checking by requiring a specific constructor for each entities table).

The persistence realised in the InMemorydataStore is injected as a dependency into the routing mechanism. A different 
implementation of the same api can be used in later development of the application. A simple application of the principle
can be seen in the unit test AuthenticationRouterModule-spec.js: A dummy datastore is provided whe requiring the module.

The entities are explained below and are simply realizations of object prototypes. 

Various unit tests have been developed and it's coverage can be calculated and reported. The unit tests are by far not
complete but should be viewed as a proof of concept (and well, ensure that the tested code doesn't break).

To generate the documentation of the application, we used JSDoc which provides conventions to generate code documentation.  