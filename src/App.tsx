import { QueryClient, QueryClientProvider } from "react-query"
import Routers from "./routes/routes"

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
      <Routers/> 
    </QueryClientProvider>
  )
}

export default App
