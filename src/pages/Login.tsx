import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import logo from '../assets/logo.webp'
import Input from '../components/@common/Input'
import Button, { type } from '../components/@common/Button'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const router = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    router('/main')
  }

  return (
    <section className="h-[calc(100vh_-_56px)] flex flex-col justify-center items-center">
      <div className='max-w-screen-md flex flex-col min-h-[640px] justify-center items-center gap-12 bg-main-medium rounded-lg'>
        <div className="flex justify-center items-center">
          <img className="w-[57%]" src={logo} />
        </div>
        <form className="flex flex-col justify-center gap-4 min-w-[350px]">
          <h1 className="text-2xl text-white">시작하기</h1>
          <Input type="text" label="Email" id="email" required={true} errors={errors} register={register} />
          <Input type="password" label="Password" id="password" required={true} errors={errors} register={register} />
          <Button onClick={handleSubmit(onSubmit)} className='bg-white px-6 py-3 text-lg rounded-md mb-10'>
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
