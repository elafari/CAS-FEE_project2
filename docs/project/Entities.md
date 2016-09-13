## Entities / documents / resource types ##
### The following entities are needed:
* article: the article / link submitted, references user, votes, comments and tags
* user: user name, some more properties and its credentials
* vote: single vote referencing the user that voted, the direction (+1, -1), and the article
* voteContainer: summarized collection of votes for a given article
* tag: "category"
* comment: comment on an article, referencing article, user (commenting)
* role: description of the role and its allowed operations

###  Article
* id: Generated ID of the article
* title: Title of the article, max length = 100, mandatory, not blank
* url: URL of the article, must be a valid URL, mandatory
* imageUrl: additional URL, if the URL itself ist not an image, must be a valid URL, optional
* description: A description, max length = 400, mandatory
* submittedBy: Reference to the user submitting the article, mandatory, immutable. IN halson replaced by embedded user object
* submittedOn: Date, when the article was initially submitted, does not reflect further edits, mandatory, immutable, must be a valid date
* votes: derived subselect as value of the votes, i.e. sum of all positive (+1) and negative votes (-1)
* userVote: +1, 0, -1 if the user already voted on the article, null if not (or no user logged in)
* tags: List of tag entities, at least one tag must be present, mandatory

### User
* id: Generated ID of the article
* username: username, min length 3, max length = 20, must be unique, not blank
* name:
* firstname:
* active: true, if the user ist still active; false if she deleted the account
* password: user password

### ArticleUserVote
* id: generated ID of the article
* userId: id of the user that voted, mandatory
* articleId: id of the article for which the user voted
* value: +1, -1 or 0, mandatory

### VoteContainer
* numberOfVotes: The number of votes the article has currently
* userVote: The value of the user's vote (+1, 0, -1; or null)

### tag
* id: generated ID of the tag
* name: name of the tag, min length = 2, max length = 15, mandatory, not blank
    
### Comment
* id: generated ID of the comment
* articleId: Reference to the article
* comment: the comment, min length = 2, max length = 400, mandatory, not blank 
* submittedBy: Reference to the user submitting the article, mandatory, immutable
* submittedOn: Date, when the article was initially submitted, does not reflect further edits, mandatory, immutable, must be a valid date

### ArticleTag 
* id: generated id
* articleId: id of the article
* tagId: id of the tag