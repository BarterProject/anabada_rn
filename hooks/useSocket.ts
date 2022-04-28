import { useCallback } from 'react';
import SocketIOClient, { Socket } from 'socket.io-client';

// import { SOCKET_URL } from '@env';
import { useSelector } from 'react-redux';
import { initialStateProps } from '../slice';

// import { useSelector } from 'react-redux';

let socket : Socket | undefined;

// const getAccessToken = async () => {
//   const isLoggedIn = await EncryptedStorage.getItem('accessToken');
//   return isLoggedIn;
// };

const useSocket = () : [Socket | undefined, () => void] => {
  const {
    accessToken: isLoggedIn,
  } = useSelector(
    (state:initialStateProps) => ({
      accessToken: state.userState.accessToken,
    }),
  );
  const disconnect = useCallback(() => {
    console.log(isLoggedIn);

    if (socket && !isLoggedIn) {
      socket.disconnect();
      socket = null;
      console.log('웹소켓 연결이 disconnect 되었습니다.');
    }
  }, [isLoggedIn]);

  if (!socket && isLoggedIn) {
    console.log(isLoggedIn, '웹소켓 연결을 진행합니다.');
    socket = SocketIOClient(`http://146.56.36.179:8088/socket?jwt=${isLoggedIn}`, {
      transports: ['websocket'],
    });
  }
  return [socket, disconnect];
};

export default useSocket;
