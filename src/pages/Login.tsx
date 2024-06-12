import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import logo from '../assets/logo.webp'
import Input from '../components/@common/atom/Input'
import Button from '../components/@common/atom/Button'
import { useNavigate } from 'react-router-dom'
import useSendLogin from '../hooks/api/user/useSendLogin'

const LoginPage = () => {
  const router = useNavigate()
  const { onSendLogin } = useSendLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      id: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    onSendLogin(body as { id: string; password: string }, {
      onSuccess: (data) => {
        console.log(data)
        router('/product')
      },
      onError: (error) => {
        console.log(error)
        alert('로그인 실패')
      },
    })
  }

  return (
    <section className="h-[calc(100vh_-_56px)] flex flex-col justify-center items-center">
      <div className="max-w-screen-md flex flex-col min-h-[640px] justify-center items-center gap-12 bg-main-medium rounded-lg">
        <div className="flex justify-center items-center">
          <img className="w-[57%]" src={logo} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-4 min-w-[350px]">
          <h1 className="text-2xl text-white">시작하기</h1>
          <Input type="text" label="ID" id="id" required={true} errors={errors} register={register} />
          <Input type="password" label="Password" id="password" required={true} errors={errors} register={register} />
          <Button type="submit" className="bg-white px-6 py-3 text-lg rounded-md mb-10">
            로그인
          </Button>
          <div className="flex w-full justify-center">
            <p className="text-white opacity-90">관리자 전용 페이지 입니다.</p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default LoginPage
