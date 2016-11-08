## Feature Check




===========

end

## Feature Check
### Mandatory features
* Erfassen neuer Links: Implemented
* Links kommentieren: Implemented
* Neue Logins/ Accounts anlegen: Implemented
* Login / Logout: Implemented (using json web token)
* Neu nur wenn logged in: Implemented (authentication handling an the front end and backend)
* Rating von Links: Implemented (vote up and down with +1 and -0)
* Rating von Kommentaren: Not implemented
* Eigenes Rating rückgängig machen: Implemented (vote up / down depending on login state and vote before; remove vote with "0")

### Non functional requirements
* Domain Objekte sauber in Klassen gekapselt: Implemented (various entities as classes)
* Layer Architektur auf dem Client: Implemented (controllers and services with corresponding depencencies)
* Fluides Design auf  Smart-Phone und Desktop: Implemented (layout changes on various break points, see the header bar as an example)
* Alle Clients sind synchron: Partial implementation (as a proof of concept voting gets synchronized between all clients)  
* Daten via Templates darstellen: Implemented (using angular data binding)
* Einfaches Deployment und Starten: Implemented (clone from git, type "npm install", type "node lnk-server.js", open app in browser (localhost, port 3000) )
* Mindestens 3 «sinnvolle» Unit Tests: Implemented (run the tests with "npm run mocha-test", check the coverage by typing "npm run coverage" and opening the file lnk/coverage/lcov-report/index.html)
* Sauberer JavaScript Code / Struktur: Implemented (as to our judgement)
* Sauberer CSS Code: Implemented (used less, as to our judgement)

### Optional requirements
* Löschen von eigenen Links: Implemented
* Bearbeiten von eigenen Links: Not implemented in the front end, the backend api allows updating the article) 
* Kommentieren  von Kommentaren: Not implemented
* Bearbeiten des Accounts: Implemented
* Dashboard für Account: Sort of implemented: Clicking on any user name will load that users articles.

**Not all features could be implemented in the quality we feel is important for a production ready application. The project 
demonstrates quite a long list of features, technologies and techniques. Some are final, some are proof of concept.
But after all, we ar absolutely convinced, that the "package" of our .lnk app reflects very well the content of
the CAS-FEE and the skills and know how we could learn.**

See a small prezi presentation for [.lnk](https://prezi.com/ccxn2fh6jjbd/lnk/)




## Alternative

### General Features
- browsing & ordering drinks (dashboard/overview/ticker)
- commenting & rating of drinks
- manage accounts (customer, manager)
- managing drinks
- pricing engine
- customizable
- filtering on best price, category, etc..
- REST & Hateoas API

### possible actors & use-cases:

#### Customer
- browsing drinks (includes filtering, search for tags, etc.)
- ordering drinks
- crud account (registering, etc.)
- login/logout (transparent)
- commenting & rating (on drinks)
- customization (e.g. preferences, currency, etc.)

#### Bar-Tender
- Manage orders (browse orders)
- Manage Stock?
- anything else?

#### Manager
- manage accounts (customer, managers)
- crud drinks (tagging, categorization)
- manage pricing engine
- login/logout
- statistics
- billing