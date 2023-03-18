import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Component/Home/Home";
import Login from "./Component/Pages/Login/Login";
import Signup from "./Component/Pages/Login/Signup";
import UserProvider from "./Context/UserProvider";
import { ToastContainer, toast } from "react-toastify";
import PrivateRoute from "./Component/Base/PrivateRoute";
import About from "./Component/About/About";
import Services from "./Component/Services/Services";
import Contact from "./Component/Contact/Conatct";
import ForgotPass from "./Component/Pages/Login/ForgotPass";
import PatientAccountList from "./Component/Pages/Accountant/PatientAccountList";
import PatientDashboard from "./Component/Pages/Patient/PatientDashboard";
import DoctorDashboard from "./Component/Pages/Doctor/DoctorDashboard";
import Appointment from "./Component/Pages/Patient/Appointment";
import AppintmentHistory from "./Component/Pages/Patient/AppointmentHistory";
import HealthHistory from "./Component/Pages/Patient/HealthHistory";
import AdminDashboard from "./Component/Pages/Admin/AdminDashboard";
import AllEmployee from "./Component/Pages/Admin/AllEmployee";
import AllPatient from "./Component/Pages/Admin/AllPatient";
import AddEmployee from "./Component/Pages/Admin/AddEmployee";
import RemoveEmployee from "./Component/Pages/Admin/RemoveEmployee";
import AdminGetResources from "./Component/Pages/HospitalResources/AdminGetResources";
import AddResources from "./Component/Pages/HospitalResources/AddResources";
import AccountantDashboard from "./Component/Pages/Accountant/AccountantDashboard";
import AppointPatientList from "./Component/Pages/Doctor/AppointPatientList";
import GetResources from "./Component/Pages/HospitalResources/GetResources";
import Schedule from "./Component/Pages/Doctor/Schedule";
import ReceptionistDashboard from "./Component/Pages/Receptionist/ReceptionistDashboard";
import AppointmentList from "./Component/Pages/Receptionist/AppointmentList";
import AdmitPatient from "./Component/Pages/Receptionist/AdmitPatient";
import DischargePatient from "./Component/Pages/Receptionist/DischargePatient";
import GetResourcesReceptionist from "./Component/Pages/HospitalResources/GetResourcesReceptionist";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          {/* <ToastContainer position='bottom-center' /> */}
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route> 
            <Route path="/about" element={<About />}></Route>
            <Route path="/services" element={<Services />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot" element={<ForgotPass />}></Route>
            <Route path="/signUp" element={<Signup />}></Route>
            
            <Route path="/user" element={<PrivateRoute />}>
              <Route path="patient/dashboard" element={<PatientDashboard />}></Route>
              <Route path="patient/appointment" element={<Appointment />}></Route>
              <Route path="patient/appoHistory" element={<AppintmentHistory />}></Route>
              <Route path="patient/healthHistory"element={<HealthHistory />}></Route>
              
              <Route path="admin/dashboard" element={<AdminDashboard />}></Route>
              <Route path="admin/allEmployee" element={<AllEmployee />}></Route>
              <Route path="admin/allPatient" element={<AllPatient />}></Route>
              <Route path="admin/addEmp" element={<AddEmployee />}></Route>
              <Route path="admin/rmEmp" element={<RemoveEmployee />}></Route>
              <Route path="admin/resources" element={<AdminGetResources />}></Route>
              <Route path="admin/addResources" element={<AddResources />}></Route>
            
              <Route path="doctor/dashboard" element={<DoctorDashboard />}></Route>
              <Route path="doctor/appointmentList" element={<AppointPatientList/>}></Route>
              <Route path="doctor/resources" element={<GetResources/>}></Route>
              <Route path="doctor/selectSchedule" element={<Schedule/>}></Route>
              
              <Route path="receptionist/dashboard" element={<ReceptionistDashboard />}></Route>
              <Route path="receptionist/appointmentList" element={<AppointmentList />}></Route>
              <Route path="receptionist/admitList" element={<AdmitPatient />}></Route>
              <Route path="receptionist/discharge" element={<DischargePatient />}></Route>
              <Route path="receptionist/resource" element={<GetResourcesReceptionist />}></Route>
              
              <Route path="accountant/dashboard" element={<AccountantDashboard />}></Route>
              <Route path="accountant/PatientAccountList"element={<PatientAccountList />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;