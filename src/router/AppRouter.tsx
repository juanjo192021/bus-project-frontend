import {Navigate, Route, Routes} from 'react-router-dom';

import { LoginPage } from '../auth';
import { BusRoutes } from '../bus/routes/BusRoutes';

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="login" element={<LoginPage />} />    
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/*" element={ <BusRoutes />} />
        </Routes>
    
    </>
  )
}
