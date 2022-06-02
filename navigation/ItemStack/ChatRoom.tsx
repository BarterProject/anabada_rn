import React, { memo, useCallback, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { chatApi, fetchAllPosts } from '../../api';
import { initialStateProps } from '../../slice';
import ChatBox from './components/ChatBox';
import messaging from '@react-native-firebase/messaging';




const Container = styled.View`
    display:flex;
    flex-direction: column;
    justify-content:space-between;
    flex:1;
`;

//텍스트 아래 속성 없어야 중앙배열
const Text = styled.Text`
    /* color:black;
    flex: 1;
    justify-content:center;
    align-items:center; */
`;

const MessageContainer = styled.View`
    flex:1;
`

const MessageInputContainer = styled.View`
    height:50px;
    border: 1px solid lightgray;
    /* border-radius: 5px;; */
    display:flex;
    flex-direction:row;
    /* position:absolute; */
`
const MessageInput = styled.TextInput`
    flex:1;
    /* margin:3px; */
    padding:5px;

`
const SendButton = styled.Button`
    width:20px;
`

// const MemoizedChatBox = memo(ChatBox);




export default function ChatRoom({ route: { params }, navigation: { setOptions
}, }) {
    const { itemIdx, name } = params
    const [height, setHeight] = useState(0)
    const [content, setContent] = useState('')
    const [roomIdx, setRoomIdx] = useState<number>(0)
    const [roomName, setRoomName] = useState(null)
    const { email } = useSelector((state: initialStateProps) => ({
        email: state.signInField.id
    }))
    //무한 스크롤을 위한 리액트 쿼티
    const {
        data,
        isLoading,
        refetch,
        isRefetching,
        hasNextPage,
        fetchNextPage
    }: any = useInfiniteQuery<any>([roomIdx],
        // fetchMovies, {
        ({ pageParam = 0 }) => chatApi.getMessages({ roomIdx, pageParam }), {
        getNextPageParam: (currentPage) => {
            // console.log('currentPage', currentPage.data.current_page);
            // console.log('currentPage.total_page', currentPage.data.total_page);
            const nextPage = currentPage.data.current_page + 1;
            return nextPage > currentPage.data.total_page ? null : nextPage;
        },
    });
    //뒤로가기 버튼
    useEffect(() => {
        setOptions({
            headerShown: true,
            title: name
        })
    }, [])
    //아이템 아이디로 챗룸 아이디, 이름 가져오기
    useEffect(() => {
        console.log('email', email)
        chatApi.getRoomById(itemIdx).then((value) => {
            console.log("chatApi.getRoomById  성공")
            setRoomIdx(value.data.idx)
            setRoomName(value.data.name)
            console.log('value.idx', value.data.idx)
        }).catch((error) => {
            console.log(error)
        })
    }, [itemIdx])

    // 리렌더를 막으려했지만 실패, ChatBox 사용
    const renderItem = useCallback(({ item }) => {
        // console.log(item)
        console.log("계속 렌더됨", item.idx)
        return (
            <ChatBox
                key={item.idx}
                id={item.idx}
                text={item.content}
                // time={item.createdAt}
                sender={item.sender.email === email}
            />)
    }, [])
    const memoizedValue = useMemo(() => renderItem, [hasNextPage]);

    // const renderItem = useCallback(async ({ item }) => {
    //     console.log(item)
    //     return (
    //         <ChatBox
    //             key={item.idx}
    //             text={item.content}
    //             sender={item.sender.email === email}
    //         />)
    // }, [])

    const loadMore = () => {
        console.log(hasNextPage)
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    const handleSubmit = () => {
        chatApi.saveMessasge({ content, roomName });
        setContent('');
    }

    // useEffect(() => {
    //     messaging().onNotificationOpenedApp((remoteMessage): any => {
    //         console.log(333333)
    //         console.log(remoteMessage)
    //     })
    //     messaging()
    //         .getInitialNotification()
    //         .then(remoteMessage => {
    //             console.log(444444)
    //             console.log(remoteMessage)
    //         })
    //     // messaging().
    // })


    // const messaging = getMessaging();
    // onMessage(messaging, (payload) => {
    //     console.log('Message received. ', payload);
    //     // ...
    // });
    // messaging().onMessage(async remoteMessage => {
    //     console.log('test')
    //     let message_body = remoteMessage.notification.body;
    // })
    useEffect(() => {
        messaging().onMessage(async remoteMessage => {
            // console.log('messaging().onMessage', remoteMessage)
            console.log('messaging().onMessage에서 remoteMessage.data.roomId ', remoteMessage.data.itemId)
            console.log('roomIdx ', itemIdx)
            if (remoteMessage.data.itemId === `${itemIdx}`) {
                console.log('remoteMessage.data.roomId === {roomIdx}', remoteMessage.data.roomId === `${itemIdx}`)

                refetch()
            }
            // let message_body = remoteMessage.notification.body;
        })
    }, [roomIdx])
    return (
        <Container>
            {
                isLoading ? (
                    <ActivityIndicator size={'large'} />
                ) : (
                    <FlatList
                        style={{
                            flex: 1,
                        }}
                        inverted
                        refreshing={isRefetching}
                        data={data.pages.map((page) => page.data.contents).flat()}
                        renderItem={memoizedValue}
                        // renderItem={({ item }) => <ChatBox key={item.idx}
                        //     id={item.idx}
                        //     text={item.content}
                        //     sender={item.sender.email === email} />}
                        // keyExtractor={useCallback((item) => { console.log(item.idx); return `${item.idx}` }, [data])}
                        // keyExtractor={(item) => { console.log(item.idx); return `${item.idx}` }}
                        keyExtractor={(item) => `${item.idx}`}
                        onEndReached={loadMore}
                        showsVerticalScrollIndicator={true}
                    />
                )}

            <MessageInputContainer>
                <MessageInput
                    multiline={true}
                    onChangeText={text => { setContent(text) }}
                    style={{ height: Math.max(50, height) }}
                    value={content}
                />
                <SendButton
                    onPress={handleSubmit}
                    title='Send'
                >
                </SendButton>
            </MessageInputContainer>
        </Container >
    );
}
