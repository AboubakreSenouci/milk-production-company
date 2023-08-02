import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import Cows from "./pages/cows/page";
import Births from "./pages/births/page";
import Examination from "./pages/examination/page";
import Milk from "./pages/milk/page";
import RoutLayout from './layouts/RoutLayout';
import Home from './pages/home/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={< RoutLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/cows" element={<Cows />} />
      <Route path="/births" element={<Births />} />
      <Route path="/examinations" element={<Examination />} />
      <Route path="/milk" element={<Milk />} />
    </Route>
  )
)


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App;