# Weather App

This project is a weather application built with React native and TypeScript. It provides real-time weather information based on the user's location.

## Intention

The goal of this project is to offer a straightforward and user-friendly interface for accessing weather information. Additionally, it demonstrates a modern React Native application developed with TypeScript, highlighting best practices and contemporary development tools. The application retrieves its weather information from YR.no and uses reverse geocoding to determine the user's actual address.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm
- Expo CLI

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repository:
   git clone https://github.com/modplug/Weather.git

2. Navigate into the project directory:
   cd your-repo-name

3. Install the dependencies:
   npm install

4. Run the project in Expo Go:
   npx expo start

## Built With

- [React](https://reactjs.org/) - The web framework used
- [TypeScript](https://www.typescriptlang.org/) - The language for application-scale JavaScript
- [Expo](https://expo.dev/) - A wrapper around react-native for building, debugging and publishing

### Future improvements
- Use the YR sunrise API to fetch the sunrise and sunset information for a given location.
- Add the possibility to search for a location given an adress and fetch the weather information from it.
- Enhance the settings context and add more customization to the app. Sync the settings with iCloud / Google.
- Fix the broken tests in the [PR](https://github.com/modplug/Weather/pull/2) - Although they run just fine on my computer 😁

## Authors

- Erlend Angelsen - Initial work - [modplug](https://github.com/modplug)
