import { QueryClient, QueryClientProvider } from 'react-query'
import Routers from './routes/routes'
import Layout from './components/@common/Layout'
import './index.css'

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
      <Layout>
        <Routers />
      </Layout>
    </QueryClientProvider>
  )
}

export default App
