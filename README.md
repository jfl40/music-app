## Music Player App
An app for music to be played on a native music player. Runs on Expo Go. Built with Expo, React Native, Typescript, Zustand.
Heavily influenced by https://github.com/CodeWithGionatha-Labs/music-player with most components copied but with some different libraries and internal logic changed to handle Expo Go incompatabilities with some packages (Expo Go doesn't run some native packages).

This app was developed using Expo Go because of hardware limitations. MacOS is required to eject a project to a bare workflow and a development build needs an EAS subscription. Thus, different libraries are required e.g. to handle Audio, menus.
The main library that is different is Expo AV. Expo AV is implemented with zustand to handle audio by managing the audio queue and the usual track player functions. Zustand is used for multiple purposes to manage both player state and music track information (Favourite/Playlist).

## Motivation
Used to gain familiarity with react-native/expo/react frameworks and learn in general what is required to develop a frontend. 
