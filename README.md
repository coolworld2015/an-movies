# AN Movies
git clone https://github.com/coolworld2015/an-movies.git
-------------------------------------------------------------------------------------------------
git config --global user.name "coolworld2015"
-------------------------------------------------------------------------------------------------
git config --global user.email "wintermute2015@ukr.net"
-------------------------------------------------------------------------------------------------
npm install -g react-native-cli
-------------------------------------------------------------------------------------------------
npm install (for an-movies.git)
-------------------------------------------------------------------------------------------------
react-native init AwesomeProject
-------------------------------------------------------------------------------------------------
rn-budget\android -> local.properties -> sdk.dir = C:/Users/ed/AppData/Local/Android/sdk
-------------------------------------------------------------------------------------------------
Android SDK Manager -> Android SDK Build-tools (23.0.1)
-------------------------------------------------------------------------------------------------
ANDROID_HOME -> C:/Users/ed/AppData/Local/Android/sdk
-------------------------------------------------------------------------------------------------
Genymotion -> Ctrl+M -> Menu
-------------------------------------------------------------------------------------------------
react-native run-android
-------------------------------------------------------------------------------------------------
APK -> react-native bundle --dev false --platform android --entry-file index.android.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug
-------------------------------------------------------------------------------------------------
APK -> cd android -> gradlew assembleDebug
-------------------------------------------------------------------------------------------------
RELEASE -> cd android -> gradlew assembleRelease -> \android\app\build\outputs\apk
-------------------------------------------------------------------------------------------------
PIC -> /android/app/src/main/res/mipmap
-------------------------------------------------------------------------------------------------
CONFIG -> android/app ->build.gradle /applicationId + versionName
-------------------------------------------------------------------------------------------------
NAME -> android\app\src\main\res\values\strings
-------------------------------------------------------------------------------------------------
https://www.npmjs.com/package/react-native-admob