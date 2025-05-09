To run the app on Android:
npm install
npx react-native run-android

To run the app on iOS
npm install
cd ios
pod install
npx react-native run-ios

1. redux-toolkit is used as the middleware
2. redux-persist is used to keep the data stored when coming back to the app. (Used AsyncStorage at the back for the same)
3. Used dark and light styles for implementing the dark and light mode. 