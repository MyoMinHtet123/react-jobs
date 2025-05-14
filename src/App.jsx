import {
    createBrowserRouter,
    Route,
    RouterProvider,
    createRoutesFromElements
} from 'react-router-dom';
import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import JobsPage from "./pages/JobsPage"
import JobPage from "./pages/JobPage"
import AddJobPage from "./pages/AddJobPage"
import UpdateJobPage from './pages/UpdateJobPage';

const App = () => {
    // Add new Job 
    const addJob = async (newJob) => {
        const res = await fetch('/api/jobs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJob),
        });

        return
    }

    // Delete Job
    const deleteJob = async (id) => {
        const res = await fetch(`/api/jobs/${id}`, {
            method: 'DELETE'
        });

        return
    }

    // Update Job
    const updateJobSubmit = async (job) => {
        const res = await fetch(`/api/jobs/${job.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(job),
        });

        return
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} />
                <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
                <Route path='/edit-job/:id' element={<UpdateJobPage updateJobSubmit={updateJobSubmit} />} />
            </Route>
        )
    );

    return (
        <RouterProvider router={router} />
    )
}

export default App
