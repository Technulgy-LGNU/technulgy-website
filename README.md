# Technulgy Website
The new Technulgy website, written in vuejs, getting data from the Technulgy Admin Software (T.A.S.).

Hosted via docker swarm (1 Manager, 2 workers) and load balanced via traefik.

# Installation
1. Clone the repository & Change to development branch
```bash
git clone https://github.com/technulgy-lgnu/technulgy-website.git

git checkout dev
```

2. Change directory to the project folder
```bash
cd technulgy-website
```
3. Install dependencies
```bash
npm install
```

4. Run the development server
```bash
npm run dev
```
Now open your browser and go to `http://localhost:5173` to see the website in action.

# Commit changes
1. Make your changes
2. Add your changes to the staging area
```bash
git add .
```
3. Commit your changes
```bash
git commit -m "Your commit message"
```
4. Push your changes to the remote repository
```bash
git push origin dev
```
5. Create a pull request to merge your changes into the main branch
6. Wait for the pull request to be reviewed and merged

# Development

## Project Structure
```bash
technulgy-website
├── public
│   ├── favicon.ico
│   ├── images/
├── src
│   ├── assets/
│   ├── components/
│   ├── locales/
│   ├── plugins/
│   ├── router/
│   ├── views/
│   ├── App.vue
│   ├── main.ts
```

Im Public Ordner könnt ihr Bilder ablegen, die ihr auf der Website verwenden wollt.
Bitte haltet die Struktur sauber und benennt die Bilder sinnvoll.

Um Inhalte zu ändern musst ihr die einzelnen Vue Dateien in den Views Ordnern anpassen.
Da wir die Website auf Deutsch und auf Englisch anbieten, müsst ihr die die Texte für
beide Sprachen in dem `locales` Ordner anpassen.

## Locales
In dem `locales` Ordner findet Ihr die Sprachdateien für die Website.
Die Dateien sind in JSON Format und enthalten die Texte für die jeweilige Sprache.
Die Struktur der Dateien ist wie folgt:
```json
{
  "key": "value",
  "key2": {
    "key3": "value3"
  }
}
```

Es ist bereits eine englische und eine deutsche Sprachdatei vorhanden.
Die englische Sprachdatei ist `en.json` und die deutsche Sprachdatei ist `de.json`.
Die Texte sind in den Dateien in der Form `key: value` gespeichert.
Die Keys sind die Bezeichner für die Texte und die Values sind die Texte selbst.
Die Keys sind in der Form `key.key2.key3` gespeichert.
Die Keys sind hierarchisch aufgebaut und können beliebig tief verschachtelt werden.

Um die Texte in den Vue Dateien zu verwenden, müsst ihr die Keys in den Dateien verwenden.
Die Keys sind in der Form `t('key.key2.key3')` gespeichert.

Die Funktion `t` ist eine Funktion, die die Texte aus den Sprachdateien lädt und die Texte in der richtigen Sprache anzeigt.

## Views bearbeiten
In dem `views` Ordner findet Ihr die Vue Dateien für die einzelnen Seiten der Website.
Die Dateien sind in der Form `Name.vue` gespeichert.
In der HomeView könnt ihr die Bilder für die SlideShow anpassen und die key values
und Bilder für die beiden Sektionen darunter anpassen.

In der Participation `ParticipationHistoryView.vue` und in der `TeamsView.vue` ist
ganz oben ein Array, in das Ihr weitere Teams und deren Erfolge einfügen könnt.
Bitte denkt daran, dass Ihr immer mit den Übersetzungen arbeitet.

Syntax `TeamsView.vue`
```javascript
const teams = [
  {
    name: "Team Name",
    description: "Team Beschreibung",
    image: "team.png",
    achievements: [
      {
        year: 2023,
        title: "Titel",
        description: "Beschreibung"
      }
    ]
  }
]
```
Syntax `ParticipationHistoryView.vue`
```javascript
const history = computed(() => [
    {
      name: "NameDesEvents",
      year: 2023,
      location: "Ort",
      awards: [
        { team: "Team Name", award: "Award Name" },
        { team: "Team Name", award: "Award Name" }
      ],
      images: [
        '/images/year/event1.png',
        ...
      ]
    }
])
```

Es gibt bereits locale für die einzelnen Events und für die awards könnt ihr die von
den Teams wiederverwenden.

```json
{
    # German Names
    "partHistory": {
        "title": "Erfolgsgeschichte",
        "go": "Deutsche Meisterschaft",
        "vo": "Süddeutsche Meisterschaft",
        "wo": "Weltmeisterschaft",
        "eo": "Europäische Meisterschaft",
        "nuremberg": "Nürnberg"
    }
    # English Names
    "partHistory": {
        "title": "Participation History",
        "go": "German Open",
        "vo": "South German Open",
        "wo": "World Open",
        "eo": "European Open",
        "nuremberg": "Nuremberg"
    }
}
```

Bei Fragen kontaktiert mich gerne: [braunelias@technulgy.com](mailto:braunelias@technulgy.com)
