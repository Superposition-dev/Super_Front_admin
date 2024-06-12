import { useMutation } from 'react-query'
import { sendLogin } from './user'

const useSendLogin = () => {
  const mutation = useMutation({
    mutationFn: sendLogin,
    onSuccess: (data) => {
      sessionStorage.setItem('token', data.accessToken)
    },
  })
  return {
    onSendLogin: mutation.mutate,
  }
}

export default useSendLogin
