## User Tests

### Introduction
Tests were performed with 3 test persons matching the defined target audience (women, around 30 yrs old).
The goal was to discover issues about usability of the application:
- can the user interact with the application intuitively?
- does the data structure make sense? Are Cases really needed?
- are there any stumbling blocks?
- does the user expect any missing features?
- possibly find bugs?

### Results

#### User1 (Nina)
- Add Event: Ist verwirrt wieso erneut das Datum eingeben werden muss (wie schon beim Case) -> Unterschied Case und Event scheint nicht ganz klar zu sein
- Datepicker-Bug: Zeit wird bei manueller Eingabe falsch gespeichert -> fixed
- Case Abschliessen via Toggler: Hat das Gefühl, dass das End-Datum beim toggeln live ausgefüllt wird und nicht erst beim speichern (sieht für den User nach einem Fehler aus). -> Workaround: Placeholder eingefügt
- Events können auch für geschlossene Cases erstellt werden.

#### User2 (Linda)
- Datepicker: Jahr kann nicht direkt verändert werden (erwartet Dropdown beim Klick auf das Jahr)
- Events Datepicker: Nicht bemerkt, dass auch die Zeit via Picker eingestellt werden kann. -> Vorschlag vom User: separate Felder für Date und Zeit
- Ignoriert nach ein paar Versuchen den Datepicker völlig und arbeitet nur noch mit manueller Eingabe via Tastatur. Vermisst dabei eine automatische Anpassung ans erwartete Format.
- StartDate eines Cases darf nicht kleiner sein als das Geburtsdatum. (Für Case/Event gilt analog das gleiche).
- Will beim Case bereits einen Event aufnehmen. -> Unterschied Case und Event nicht klar
- Case: ist verwirrt vom Enddatum. Vorschlag vom User: Feld ausblenden wenns leer ist.
- Patients, Cases und Events sind nicht sinnvoll sortiert -> fixed

#### User3 (Aline)
- Datepicker: Hat folgende Probleme:
  - Jahr wählen ist zu umständlich
  - Sieht Zeit nicht bei den Events und gibt sie darum manuell ein
- Case: Gibt als Case-Name 'Fieber' ein, was sich eher auf einen Event bezieht
- Events: Will für Temperaturmessung und Medikamentengabe nicht 2 Events aufnehmen müssen, da dies oft zusammen anfällt
- Events: Ein zusätzliches Feld für Bemerkungen/Beobachtungen wäre hilfreich -> bereits in Planung, jedoch ausserhalb des Projektscopes

### Consequences
- Die Eingabe von Datum und Zeit muss verbessert werden. Mögliche Schritte:
  - Felder trennen
  - Automatische Formatierung bei manueller Eingabe
- Cases sind für die User verwirrend. Mögliche Schritte:
  - Cases im Frontend eliminieren und transparent im Hintergrund abhandeln
  - Cases ganz eliminieren und dafür die Events-Table mit Filter und Sortierfunktionen ausstatten
- Kleinere Bugs konnten behoben werden
 
## Project-Documentation
- [README.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/README.md)
- [docs/project/01-Architecture.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/01-Architecture.md)
- [docs/project/02-Entities.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/02-Entities.md)
- [docs/project/03-Usage.md](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/project/03-Usage.md)
- [docs/diagrams/*](https://github.com/elafari/CAS-FEE_project2/blob/doc/docs/diagrams/)
