import Sidebar from '../../components/Sidebar'
import { Flex, Heading, } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { FormControl, Input, Button, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { db, auth} from '../../firebaseconfig'
import { query, collection, orderBy, doc, serverTimestamp, addDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import getOtherEmail from '../../utils/getOtherEmail'
import { useState, useRef, useEffect } from 'react'

const Topbar = ({email}) => {
    return (
        <Flex bg="green.300" h="60px" w="100%" align="center" p={5}>
            <Avatar src="" marginEnd={3}/>
            <Heading size="md">{email}</Heading>
        </Flex>
    )
}

const Bottombar = ({id, user}) => {
    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, `chats/${id}/messages`), {
            text: input,
            sender: user.email,
            timestamp: serverTimestamp()
        })
        setInput("");
    }

    return (
        <FormControl p={3} onSubmit={sendMessage} as="form">
            <Input placeholder="Type a message" autoComplete="off" onChange={e => setInput(e.target.value)} value={input}/>
            <Button type="submit" hidden>Submit</Button>
        </FormControl>
    )
}

const Chat = () => {
    const router = useRouter();
    const { id } = router.query;

    const [user] = useAuthState(auth);

    const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
    const [messages] = useCollectionData(q);

    const [chat] = useDocumentData(doc(db, "chats", id));
    
    const bottomOfChat = useRef();
    

    const getMessages = () =>
    messages?.map(msg => {
        const sender = msg.sender === user.email;
        
        return (
        <Flex key={Math.random()} alignSelf={sender ? "flex-start" : "flex-end"} bg={sender ? "blue.100" : "green.100"} w="fit-content" minWidth="100px" borderRadius="lg" p={3} m={1}>
            <Text>{msg.text}</Text>
        </Flex>
        )
    })

    useEffect(() =>
    setTimeout(
      bottomOfChat.current.scrollIntoView({
      behavior: "smooth",
      block: 'start',
    }), 100)
  , [messages])


  return (
    <Flex h="100vh">
        <Head>
            <title>Bjoey Legend</title>
        </Head>
        <Sidebar />

        <Flex bg="purple.400" flex={1} direction="column">
            <Topbar email={getOtherEmail(chat?.users, user)} />
        <Flex flex={1} direction="column" pt={4} mx={5} overflowX="hidden" sx={{'&::-webkit-scrollbar': {
      width: '16px',
      borderRadius: '8px',
      backgroundColor: `rgba(0, 0, 9, 0.05)`,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
      },}}>

            {getMessages()}
            <div ref={bottomOfChat}></div>


        </Flex>

            <Bottombar id={id} user={user}/>
        </Flex>
    </Flex>
  )
}

export default Chat