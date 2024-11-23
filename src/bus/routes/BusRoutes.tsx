import { Navigate, Route, Routes } from 'react-router-dom'
import BusPage from '../pages/BusPage'

export const BusRoutes = () => {
  return (
    <>
        <div>
            <Routes>
                <Route path="bus" element={<BusPage />} />
                <Route path="/" element={<Navigate to="/bus" />} />
            </Routes>
        </div>


    </>
  )
}
