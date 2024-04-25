# ChessPal

ChessPal is a mobile application built with React Native. It provides a platform for users to learn and play chess.

## Interface

Here are some screenshots of the app:

<p float="left">
  <img src="images/main.png" width="250" />
  <img src="images/new.png" width="250" /> 
  <img src="images/search.png" width="250" />
</p>

## Installation 

Clone the repository and install the dependencies.

```bash
git clone https://github.com/kridesav/ChessPal.git
cd ChessPal
npm install
```

## Using the application

For running on a simulator on pc:

```bash
npx expo start
```
or alternatively using expo app on your phone:

```bash
npx expo start --tunnel
```

and launch with QR-code from the terminal.

## Features

Chesspal is designed for learning opening theory in chess, it has large dataset of openings that you can search
and try.

Chesspal also lets you theorycraft in a fresh game on your own, currently there isnt a chess engine implemented but
in the future it is planned, so you can test your freshly learned theory against different difficulty bots.

Chesspal has very user-friendly interface and it is easy to approach.

## Dependencies

Opening data from here: [Github](https://github.com/hayatbiralem/eco.json)

### Navigation

- [@react-navigation/native-stack](https://www.npmjs.com/package/@react-navigation/native-stack): ^6.9.26

### Chess board state

- [chess.js](https://www.npmjs.com/package/chess.js): ^1.0.0-beta.8

### Chess board

- [react-native-chessboard](https://www.npmjs.com/package/react-native-chessboard): ^0.1.2

### UI elements

- [react-native-paper](https://www.npmjs.com/package/react-native-paper): ^5.12.3

## Author

Kristjan Savolainen - [Github](https://github.com/kridesav)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

