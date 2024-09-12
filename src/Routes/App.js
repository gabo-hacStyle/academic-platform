import { Routes, Route, BrowserRouter } from "react-router-dom";
import { WelcomePage } from "./WelcomePage";
import { Profile } from "../Components/Profile";
import { Staff } from "../Components/Staff";
import { NavBar } from "../Components/NavBar";
import { HeaderAdmin } from "../Components/Admin/HeaderAdmin";
import { CreateCourse } from "../Components/Admin/Courses/CreateCourse";
// import { CreateStudent } from "../Components/Admin/Students/CreateStudent";
import CreateAndEdit from "../Components/Admin/shared/CreateAndEdit";
import { CreateUser } from "../Components/Admin/Users/CreateUser";
import { AdminPage } from "../Components/Admin/AdminPage";
import { EditStudent } from "../Components/Admin/Students/EditStudents";
import { EditUser } from "../Components/Admin/Users/EditUser";
import { EditCourse } from "../Components/Admin/Courses/EditCourse";
import { AuthProvider } from "../Hooks/auth";
import { ContextProvider } from "../context/SidebarMode";
import "./app.css";
import { ShowStudent } from "../Components/Staff/ShowStudent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <ContextProvider>
            <Routes>
              <Route path="/" element={<NavBar />}>
                {/* Página de login */}
                <Route index element={<WelcomePage />} />

                {/* Página para los funcionarios */}
                <Route path="/staff" element={<Profile />}>
                  <Route index element={<Staff />} />
                  <Route path="/staff/student/:id" element={<ShowStudent />} />
                </Route>

                {/* Página para los administradores */}
                <Route path="/admin" element={<HeaderAdmin />}>
                  <Route index element={<AdminPage />} />
                </Route>
              </Route>
            </Routes>
          </ContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export { App };
