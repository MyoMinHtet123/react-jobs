import { useState, useEffect } from "react"
import JobListing from "./JobListing"

const JobListings = ({ isHome = false }) => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const apiUri = isHome ? '/api/jobs?_limit=3' : '/api/jobs';
            try {
                const jobs = await fetch(apiUri);
                const data = await jobs.json();
                setJobs(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, []);
    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    {isHome ? 'Recent Jobs' : 'Borwse Jobs'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {isLoading ? (<h1>Loading...</h1>) :
                        (<>
                            {jobs.map(job => (<JobListing key={job.id} job={job} />))}
                        </>)}
                </div>
            </div>
        </section>
    )
}

export default JobListings
