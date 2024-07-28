import { QueryClient, QueryClientProvider } from 'react-query'
import Container from '@mui/material/Container'
import TodoList from './components/TodoList';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <Container maxWidth='md'>
      <TodoList/>
    </Container>
  </QueryClientProvider>
  )
}

export default App
