import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
// import { KeyboardAwareScrollView } from '';

import { useDispatch, useSelector } from 'react-redux';

import SignIn from './SignIn';

jest.mock('react-redux');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
// jest.mock('@react-navigation/native');
jest.mock('@react-navigation/native', () => ({
  __esModule: true,
  ...jest.requireActual('@react-navigation/native'),

  //   //   useNavigate: () => ({ dispatch: jest.fn() }),
  //   CommonActions: () => ({ reset: jest.fn() }),
  default: jest.fn(),
  useNavigation: () => ({
    default: jest.fn(),
    dispatch: jest.fn(),
  }),
  //   CommonActions: { reset: jest.fn() },
//   useNavigation: jest.fn(),
}));

// jest.mock('@react-navigation/native');
jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = ({ children }) => children;
  return { KeyboardAwareScrollView };
});

jest.mock('../../slice');
jest.mock('react-native-encrypted-storage');
// jest.mock('react-native');
// jest.mock('styled-components/native', () => ({
//   View: jest.fn(),
//   TouchableOpacity: jest.fn(),
//   Text: jest.fn(),
//   TextInput: jest.fn(),
// }));

describe('token ', () => {
  const dispatch = jest.fn();
  const navigation = jest.fn();

  //   const navigation = useNavigation();
  //   const navigation = jest.fn();
  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
    dispatch.mockClear();
    // useNavigation.mockImplementation(() => navigation);
  });

  it('doesn`t has token ', () => {
    useSelector.mockImplementation((selector) => selector({
      userState: {
        accessToken: null,
      },
    }));
    const { getByText } = render(
      <SignIn />,
    );
    expect(getByText('로그인')).toBeTruthy();
    //   expect(tree).toMatchSnapshot();
  });

  it('has token ', () => {
    useSelector.mockImplementation((selector) => selector({
      userState: {
        accessToken: 'accessToken',
      },
    }));
    const { getByText } = render(
      <SignIn />,
    );
    expect(getByText('로그인')).toBeTruthy();
    //   expect(tree).toMatchSnapshot();
  });
  it('have err with token ', () => {
    useSelector.mockImplementation((selector) => selector({
      userState: {
        accessToken: 'err',
      },
    }));
    const { getByText } = render(
      <SignIn />,
    );
    expect(getByText('로그인')).toBeTruthy();
    //   expect(tree).toMatchSnapshot();
  });

  it('requestLogin', () => {
    const { getByText } = render(
      <SignIn />,
    );
    dispatch.mockClear();
    fireEvent(getByText('로그인'), 'press');
    expect(dispatch).toBeCalledTimes(3);
  });

  it('fillLogin', () => {
    const { getByPlaceholderText } = render(
      <SignIn />,
    );

    fireEvent(getByPlaceholderText('아이디'), 'onChangeText', 'ab');
    fireEvent(getByPlaceholderText('비밀번호'), 'onChangeText', 'ab');
  });
});

describe('test', () => {

});
