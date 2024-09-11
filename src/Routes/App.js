import { Routes, Route, BrowserRouter } from "react-router-dom";
import { WelcomePage } from "./WelcomePage";
import { Profile } from "../Components/Profile";
import { Staff } from "../Components/Staff";
import { NavBar } from "../Components/NavBar";
import { HeaderAdmin } from "../Components/Admin/HeaderAdmin";
import { CreateCourse } from "../Components/Admin/Courses/CreateCourse";
import { CreateStudent } from "../Components/Admin/Students/CreateStudent";
import { CreateUser } from "../Components/Admin/Users/CreateUser";
import { AdminPage } from "../Components/Admin/AdminPage";
import { EditStudent } from "../Components/Admin/Students/EditStudents";
import { EditUser } from "../Components/Admin/Users/EditUser";
import { EditCourse } from "../Components/Admin/Courses/EditCourse";
import { AuthProvider } from "../Hooks/auth";
import { ContextProvider } from "../context/SidebarMode";
import './app.css';

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
                </Route>

                {/* Página para los administradores */}
                <Route path="/admin" element={<HeaderAdmin />}>
                  <Route index element={<AdminPage />} />
                  <Route path="/admin/students/new" element={<CreateStudent />} />
                  <Route path="/admin/users/new" element={<CreateUser />} />
                  <Route path="/admin/courses/new" element={<CreateCourse />} />

                  <Route
                    path="/admin/students/edit/:id"
                    element={<EditStudent />}
                  />
                  <Route path="/admin/users/edit/:id" element={<EditUser />} />
                  <Route
                    path="/admin/courses/edit/:id"
                    element={<EditCourse />}
                  />
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
