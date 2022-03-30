import Head from 'next/head'
import { LockIcon } from '@chakra-ui/icons'
import { Box, Button ,Center ,Stack} from '@chakra-ui/react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseconfig'

function Login() {

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <>

    <Head>
        <title>Login</title>
    </Head>

    <Center h="100vh">
        <Stack align="center" bgColor="gray.700" p={16} rounded="3xl" spacing={12}>
    <Box boxShadow="dark-lg" bgColor="blue.500" w="fit-content" bgGradient='linear(red.100 0%, orange.100 25%, yellow.100 50%)' p={5} rounded="xl">
    <LockIcon w="100px" h="100px" color="black" />
    </Box>

    <Button boxShadow="md" onClick={() => signInWithGoogle("", {prompt: "select_account"})}>Sign in with Google</Button>
        </Stack>
    </Center>

    </>
  )
}

export default Login