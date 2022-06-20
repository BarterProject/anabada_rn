import React, { useEffect, useRef, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigatorScreenParams, useNavigation } from '@react-navigation/native';

import Auth, { AuthStackParamList } from './Auth';
import Home from './Home';
import Alarm from './Alarm';
import Item from './Item';


import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { useDispatch } from 'react-redux';
import { resetRandomItems, setItemToDeal } from '../slice';

import DropdownAlert from 'react-native-dropdownalert';
import { AlertHelper } from './components/AlertHelper';
import { StatusBar } from 'react-native';


StatusBar.setBackgroundColor("black");

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



const Nav = createNativeStackNavigator<RootStackParamList>();

function Root() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  PushNotification.configure({
    // (optional) 토큰이 생성될 때 실행됨(토큰을 서버에 등록할 때 쓸 수 있음)
    onRegister(token: any) {
      console.log('TOKEN:', token);
    },

    // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
    onNotification(notification: any) {
      console.log('onNotification NOTIFICATION:', notification);
      if (notification.data.channelId === 'ItemActivated') {
        console.log('채널 아이디가 ItemActivated이다.')
        console.log(notification.data)
        AlertHelper.show('info', notification.title, notification.message)
      } else if (notification.data.channelId === 'chatting') {
        console.log('채팅 알람이 왔습니다. foreground.')
        // AlertHelper.show('info', notification.title, notification.message)
      } else if (notification.data.channelId === 'DealBeenRequested') {
        console.log("🟢AlertHelper DealBeenRequested")
        console.log(notification.data)
        AlertHelper.show('info', notification.title, notification.message)
        dispatch(setItemToDeal(parseInt(notification.data.itemId)));

      } else if (notification.data.channelId === 'DealCompleted') {
        console.log("🟢AlertHelper DealCompleted")
        console.log(notification.data)
        AlertHelper.show('info', notification.title, notification.message)
        dispatch(setItemToDeal(parseInt(notification.data.itemId)));

      } else if (notification.data.channelId === 'DeliveryRequested') {
        AlertHelper.show('info', notification.title, notification.message)

      } else if (notification.data.channelId === 'DeliveryStarted') {
        AlertHelper.show('info', notification.title, notification.message)

      } else if (notification.data.channelId === 'DepositLost') {
        AlertHelper.show('info', notification.title, notification.message)

      } else if (notification.data.channelId === 'DepositPresented') {
        AlertHelper.show('info', notification.title, notification.message)

      } else if (notification.data.channelId === 'DepositRefunded') {
        AlertHelper.show('info', notification.title, notification.message)
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

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage): any => {
      // console.log("test1111111")
      console.log(remoteMessage);

      if (remoteMessage.data.channelId === 'ItemActivated') {
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'Main',
            params: {
              screen: '아이템',
            }
          }
        })
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'Detail',
            params: {
              readOnly: true,
              itemIdx: parseInt(remoteMessage.data.itemId),
              inventoryMode: true,
            }
          },
        });
      } else if (remoteMessage.data.channelId === 'DealBeenRequested') {
        dispatch(setItemToDeal(parseInt(remoteMessage.data.itemId)));
        navigation.navigate('Home', {
          screen: 'ItemDeals',
          params: {
            screen: '받은 요청',
            getNewData: true
          }
        })
      } else if (remoteMessage.data.channelId === 'DealCompleted') {
        dispatch(setItemToDeal(parseInt(remoteMessage.data.itemId)))
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'Main',
            params: {
              screen: '인벤토리',
            }
          }
        })
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'Detail',
            params: {
              readOnly: true,
              itemIdx: parseInt(remoteMessage.data.itemId),
              inventoryMode: true,
            }
          },
        });
        dispatch(setItemToDeal(parseInt(remoteMessage.data.itemId)));
        dispatch(resetRandomItems())
      } else if (remoteMessage.data.channelId === 'DeliveryRequested') {
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'Main',
            params: {
              screen: '아이템',
            }
          }
        })
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'Detail',
            params: {
              itemIdx: parseInt(remoteMessage.data.itemId),
              isItItem: true
              // inventoryMode: true,
            }
          },
        });
      } else if (remoteMessage.data.channelId === 'DeliveryStarted') {
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'Main',
            params: {
              screen: '인벤토리',
            }
          }
        })
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'Detail',
            params: {
              readOnly: true,
              itemIdx: parseInt(remoteMessage.data.itemId),
              inventoryMode: true,
            }
          },
        });
      } else if (remoteMessage.data.channelId === 'DepositLost') {
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'Main',
            params: {
              screen: '아이템',
            }
          }
        })
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'Detail',
            params: {
              itemIdx: parseInt(remoteMessage.data.itemId),
              isItItem: true,
            }
          },
        });
      } else if (remoteMessage.data.channelId === 'DepositPresented') {
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'Main',
            params: {
              screen: '아이템',
            }
          }
        })
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'Detail',
            params: {
              itemIdx: parseInt(remoteMessage.data.itemId),
              inventoryMode: true,
            }
          },
        });
      } else if (remoteMessage.data.channelId === 'DepositRefunded') {
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'Main',
            params: {
              screen: '아이템',
            }
          }
        })
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'Detail',
            params: {
              readOnly: true,
              itemIdx: parseInt(remoteMessage.data.itemId),
            }
          },
        });
      } else if (remoteMessage.data.channelId === 'chatting') {
        navigation.navigate('Home', {
          screen: 'Item',
          params: {
            screen: 'ChatRoom',
            params: {
              itemIdx: remoteMessage.data.itemId,
              name: ''
            }
          }
        })
        // navigation.navigate('Home', {
        //   screen: 'Item',
        //   params: {
        //     screen: 'Detail',
        //     params: {
        //       readOnly: true,
        //       itemIdx: parseInt(remoteMessage.data.itemId),
        //     }
        //   },
        // });
      }
      //chatting일 경우 해당 아이템의 채팅방 스크린으로 이동
    });

    messaging().getInitialNotification().then(remoteMessage => {
      console.log("222222")
      console.log(remoteMessage);

      // if (remoteMessage) {
      // console.log(
      //   'Notification caused app to open from quit state:',
      //   remoteMessage.notification,
      // );
      // console.log('remoteMessage.data.route', remoteMessage.data.route)
      // setInitialRoute(remoteMessage.data.route); // e.g. "Settings"
      // }
      setLoading(false);
    });
    // messaging().onMessage(async remoteMessage => {
    //   // console.log('messaging().onMessage', remoteMessage)
    //   console.log('messaging().onMessage에서 remoteMessage.data.roomId ', remoteMessage.data.roomId)
    //   console.log('roomIdx ', roomIdx)
    //   if (remoteMessage.data.roomId === `${roomIdx}`) {
    //     console.log('remoteMessage.data.roomId === {roomIdx}', remoteMessage.data.roomId === `${roomIdx}`)

    //     // refetch()
    //   }
    //   // let message_body = remoteMessage.notification.body;
    // })
  }, []);

  // useEffect(() => {
  //   AlertHelper.setOnClose(() => { alert('Hi, I am onClose') });
  // });
  return (
    <>
      <DropdownAlert
        defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row' }}
        ref={ref => AlertHelper.setDropDown(ref)}
        // onPress={() => console.log("touch")}
        onClose={() => AlertHelper.invokeOnClose()}
      />
      <Nav.Navigator
        initialRouteName={"Auth"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Nav.Screen name="Auth" component={Auth} />
        <Nav.Screen name="Home" component={Home} />
        <Nav.Screen name="Alarm" component={Alarm} />
        <Nav.Screen name="Item" component={Item} />
      </Nav.Navigator>
    </>
  );
}

export default Root;
