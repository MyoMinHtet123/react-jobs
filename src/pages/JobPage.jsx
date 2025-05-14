import { useState, useEffect } from "react";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";

const JobPage = ({ deleteJob }) => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onClickDelete = (id) => {
        const confirm = window.confirm('Are you sure to delete');

        if (!confirm) return;

        deleteJob(id)

        navigate('/jobs')
    }

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`/api/jobs/${id}`);
                if (!res.ok) {
                    throw new Error("Job not found");
                }
                const data = await res.json();
                setJob(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        to="/"
                        className="text-indigo-500 hover:text-indigo-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Job Listings
                    </Link>
                </div>
            </section>

            <section className="bg-indigo-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                        <main>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                                <div className="text-gray-500 mb-4">{job.type}</div>
                                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                                    <FaMapMarker className="text-orange-700 mr-2" />
                                    <p className="text-orange-700">{job.location}</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                                    Job Description
                                </h3>

                                <p className="mb-4">{job.description}</p>

                                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                                    Salary
                                </h3>

                                <p className="mb-4">{job.salary} / Year</p>
                            </div>
                        </main>

                        {/*<!-- Sidebar -->*/}
                        <aside>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                                <h2 className="text-2xl">{job && job.companyName}</h2>

                                <p className="my-2">{job && job.companyDescription}</p>

                                <hr className="my-4" />

                                <h3 className="text-xl">Contact Email:</h3>

                                <p className="my-2 bg-indigo-100 p-2 font-bold">
                                    {job && job.contactEmail}
                                </p>

                                <h3 className="text-xl">Contact Phone:</h3>

                                <p className="my-2 bg-indigo-100 p-2 font-bold">
                                    {job && job.contactPhone}
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                                <Link
                                    to={`/edit-job/${job.id}`}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                >
                                    Edit Job
                                </Link>
                                <button onClick={() => onClickDelete(job.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                                    Delete Job
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JobPage;
