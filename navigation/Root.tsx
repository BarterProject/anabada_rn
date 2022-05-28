import React, { useEffect, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigatorScreenParams, useNavigation } from '@react-navigation/native';

import Auth, { AuthStackParamList } from './Auth';
import Home from './Home';
import Alarm from './Alarm';
import Item from './Item';


import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';


export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Home: undefined;
  Alarm: undefined;
  Item: undefined;
};


messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  const { notification: { android: { channelId, sound } } } = remoteMessage;
  if (channelId)
    console.log('Message handled in the background!', remoteMessage);
});

// const navigationDeferred = new Deferred

PushNotification.configure({
  // (optional) 토큰이 생성될 때 실행됨(토큰을 서버에 등록할 때 쓸 수 있음)
  onRegister(token: any) {
    console.log('TOKEN:', token);
  },

  // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
  onNotification(notification: any) {
    console.log('onNotification NOTIFICATION:', notification);
    if (notification.channelId === 'ItemActivated') {
      console.log('채널 아이디가 ItemActivated이다.')
      // if (notification.message || notification.data.message) {
      //   store.dispatch(
      //     userSlice.actions.showPushPopup(
      //       notification.message || notification.data.message,
      //     ),
      //   );
      // }
    }
    // process the notification

    // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) 등록한 액션을 누렀고 invokeApp이 false 상태일 때 실행됨, true면 onNotification이 실행됨 (Android)
  onAction(notification: any) {
    console.log('onAction ACTION:', notification.action);
    console.log('onAction NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications.
  // Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err: Error) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'message', // (required)
    channelName: '앱 전반', // (required)
    channelDescription: '메시지가 도착했습니다.', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: boolean) => console.log(`createChannel riders returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.createChannel(
  {
    channelId: 'ItemActivated', // (required)
    channelName: '앱 전반', // (required)
    channelDescription: '아이템이 활성화됐습니다.', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: boolean) => console.log(`createChannel riders returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);
PushNotification.createChannel(
  {
    channelId: 'DealRequested', // (required)
    channelName: '앱 전반', // (required)
    channelDescription: '교환이 요청됐습니다.', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: boolean) => console.log(`createChannel riders returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);



PushNotification.createChannel(
  {
    channelId: 'DeliverRequested', // (required)
    channelName: '앱 전반', // (required)
    channelDescription: '배송 요청이 됐습니다.', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: boolean) => console.log(`createChannel riders returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.createChannel(
  {
    channelId: 'DeliveryStarted', // (required)
    channelName: '앱 전반', // (required)
    channelDescription: '배송이 시작되었습니다.', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: boolean) => console.log(`createChannel riders returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.createChannel(
  {
    channelId: 'DepositRefunded', // (required)
    channelName: '앱 전반', // (required)
    channelDescription: '보증금이 지급되었습니다.', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: boolean) => console.log(`createChannel riders returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const Nav = createNativeStackNavigator<RootStackParamList>();

function Root() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<'Auth' |
    'Home' |
    'Alarm' |
    'Item'>('Auth');
  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage): any => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      console.log('remoteMessage.data.route', remoteMessage.data.route)
      navigation.navigate(remoteMessage.data.route);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          console.log('remoteMessage.data.route', remoteMessage.data.route)
          setInitialRoute(remoteMessage.data.route); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  return (
    <Nav.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Nav.Screen name="Auth" component={Auth} />
      <Nav.Screen name="Home" component={Home} />
      <Nav.Screen name="Alarm" component={Alarm} />
      <Nav.Screen name="Item" component={Item} />
    </Nav.Navigator>
  );
}

export default Root;
