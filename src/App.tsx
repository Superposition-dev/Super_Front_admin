import { QueryClient, QueryClientProvider } from 'react-query'
import Routers from './routes/routes'
import Layout from './components/@common/Layout'
import './index.css'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Layout>
          <Routers />
        </Layout>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
