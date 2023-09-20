import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { WelcomePage } from './WelcomePage';
import {Profile} from '../Components/Profile'
import { Main } from './Main/index';
import {NavBar} from '../Components/NavBar'
import { HeaderAdmin } from '../Components/Admin/HeaderAdmin';
import { CreateCourse } from '../Components/Admin/Courses/CreateCourse';
import { CreateStudent } from '../Components/Admin/Students/CreateStudent';
import { CreateUser } from '../Components/Admin/Users/CreateUser';
import { AdminPage } from '../Components/Admin/AdminPage';
import { EditStudent } from '../Components/Admin/Students/EditStudents';
import { EditUser } from '../Components/Admin/Users/EditUser';
import { EditCourse } from '../Components/Admin/Courses/EditCourse';
import { AuthProvider } from '../Hooks/auth';

function App() {
  
  return (
    <div className="App">
      
        <BrowserRouter> 
          <AuthProvider>
            <Routes>
                  <Route path='/' element={<NavBar />} >
                    <Route index
                      element={
                        <WelcomePage/>} 
                    />
                    <Route path='/staff' 
                      element={<Profile /> }>
                        <Route index element={
                                <Main /> 
                        } />
                    </Route>
                    
                          
                      <Route path='/admin' element={<HeaderAdmin />}>                                              
                            <Route index element={
                                <AdminPage /> 
                            } />
                            <Route path='/admin/students/new' element={<CreateStudent />} />
                            <Route path='/admin/users/new' element={<CreateUser />} />
                            <Route path='/admin/courses/new' element={<CreateCourse />} />

                                                
                            <Route path='/admin/students/edit/:id' element={<EditStudent />} />
                            <Route path='/admin/users/edit/:id' element={<EditUser />}/>
                            <Route path='/admin/courses/edit/:id' element={<EditCourse />}/>
                        </Route>
                  </Route>
            </Routes>
          </AuthProvider>   
            
        </BrowserRouter>
      
         
    </div>
  );
}

export {App};