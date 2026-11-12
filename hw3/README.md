# HW 3: Full Stack Frameworks and Libraries

HW 3 consist of 3 folders:

|Folder | What it is |
|---|---|
|`react/`| React tick-tac-toe tutorial from react.dev|
|`socketio/`| Socket.IO basic chat tutorial |
|`rickandmorty/`| Rick and Morty API exercise app bult with React |

## Prerequisites

- [Node.js](https://nodejs.org) (LTS version ) and npm
  
each project has its own dependencies, so run `npm install` inside each folder you run at the beginning

## React: tic-tac-toe
```bash
cd hw3/react
npm install
npm run dev
```
Open the link shown in the terminal (usually http://localhost:5173).

The project was set up with Vite instead of the tutorial's CodeSandbox, so the tutorial's `App.js` is `src/App.jsx` here and `styles.css` is `src/index.css`.

## Socket.IO: chat app

```bash
cd hw3/socketio
npm install
node index.js
```
Open http://localhost:3000 in two browser tabs and send messages to see them appear in both.

Completed through the broadcasting step of the tutorial (basic real-time chat).

## Rick and Morty app

```bash
cd hw3/rickandmorty
npm install
npm run dev
```
Open the link shown in the terminal. If port 5173 is already in use, Vite picks another port, such as 5174.

### Routes

| Route | What it shows |
|---|---|
| `/home` | Welcome message |
| `/characters` | The first 100 characters with name, picture, species, and status |
| `/species` | Number of characters in each species, with their names |
| `/locations` | Number of locations by type |

Visiting `/` redirects to `/home`.

### Notes

- The first 100 characters are fetched in a single request using the API's multiple-ID feature (`/api/character/1,2,...,100`) instead of paging through 5 pages.
- Species counts are based on the first 100 characters.
- `/locations` makes a first request to get the total number of locations, then fetches all of them by ID.
- Missing species or location types are shown as "Unknown".
