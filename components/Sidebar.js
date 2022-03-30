import { Flex, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { IconButton } from '@chakra-ui/button'
import { DragHandleIcon } from '@chakra-ui/icons'
import { Button, Progress, Alert, AlertTitle, AlertDescription, AlertIcon } from '@chakra-ui/react'
import { signOut } from "firebase/auth";
import { auth } from '../firebaseconfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc } from '@firebase/firestore';
import { db } from '../firebaseconfig'
import getOtherEmail from '../utils/getOtherEmail'
import { useRouter } from 'next/router'

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map(doc => ({id: doc.id, ...doc.data()}));
  const router = useRouter();

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  }

  const chatExist = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)))

  const newChat = async () => {
    const input = prompt("enter email address")

    if (!chatExist(input) && (input != user.email)) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] })
    }
  }

  const chatList = () => {
    return (
        chats?.filter(chat => chat.users.includes(user.email))
        .map(
          chat =>
          <Flex key={Math.random()} p={2} align="center" _hover={{bg: "gray.100", cursor: "pointer"}} onClick={() => redirect(chat.id)}>
          <Avatar src="" marginEnd={3}/>
          <Text>{getOtherEmail(chat.users, user)}</Text>
      </Flex>
        )
    )
}

  return (
    <Flex bg="yellow.300" w="300px" h="100vh" borderEnd="5px solid" borderColor="gray.200" direction="column">

    <Flex align="center" bg="gray.200" h="80px" w="100%" justifyContent="space-between" p={3} borderBottom="5px solid" borderColor="red.200">
        
        <Flex align="center">
        <Avatar src={user.photoURL} marginEnd={3}/>
        <Text as="samp">{user.displayName}</Text>
        </Flex>

        <IconButton icon={<DragHandleIcon />} size="sm" isRound onClick={() => signOut(auth)}/>
    </Flex>

    <Button m={5} p={4} onClick={() => newChat()}>Tambah Teman Berbicara</Button>
    <Alert status='success'
  variant='subtle'
  flexDirection='column'
  alignItems='center'
  justifyContent='center'
  textAlign='center'
  height='120px'>
    <AlertIcon />
      <AlertTitle>Bjoey Chat App</AlertTitle>
      <AlertDescription as='samp'>This Website Was Created By : Bjoey</AlertDescription>
    </Alert>

    <Flex overflowX="hidden" direction="column" sx={{'&::-webkit-scrollbar': {
      width: '16px',
      borderRadius: '8px',
      backgroundColor: `rgba(0, 0, 0, 0.05)`,
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
      },}} flex>
        {chatList()}
      
    </Flex>

    </Flex>
  )
}

export default Sidebar