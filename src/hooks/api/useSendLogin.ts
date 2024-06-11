import axios from "axios";
import { useCallback } from "react";
import { useMutation } from "react-query";

type body = {
  id: string;
  password: string;
}

const useSendLogin = () => {
  const sendLogin = async (body:body) => {
    const { id, password } = body;
    try {
      const res = await axios({
        method: 'post',
        url:"http://49.50.167.129:8080/users/login",
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ id, password }),
      });

      
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
  const mutaiton = useMutation({
    mutationFn: sendLogin,
    onSuccess: (data) => {
      sessionStorage.setItem('token', data.accessToken);
    }
  });
  return {
    onSendLogin: mutaiton.mutate,
  }
}

export default useSendLogin;