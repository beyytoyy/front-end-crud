import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import axios from "axios"

function Users() {
    const { id } = useParams()
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([])
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);

    useEffect(() => {
        fetchData();
    }, [limit, currentPage]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/?limit=${limit}&page=${currentPage}`)
            console.log(response.data);
            setData(response.data.users);
            setTotalPages(response.data.totalPages);
            setTotalEntries(response.data.totalUsers);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete?");
        if (isConfirmed) {
            axios.delete('http://localhost:3001/delete/' + id)
            .then(res => {
                console.log(res)
                setData(prevData => prevData.filter(user => user._id !== id));
                alert("Deleted Successfully");
            }).catch(err => console.log(err))
        }
    }

    const filteredData = data.filter(user =>
        user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );         

    const handleLimitChange = (e) => {
        setLimit(parseInt(e.target.value));
        setCurrentPage(1);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }


    return (
        <div className="d-flex" style={{backgroundColor: '#343a40'}}>
                <div className="container" style={{ width: '100%'}}>
                    <h1 className="mt-5 mb-5 text-center text-white">
                        <b>
                            <a>CRUD APPLICATION</a>
                        </b> 
                    </h1>
                    <div className = "card" style={ 
                        {position: 'relative', display: 'flex',
                        flexDirection: 'column', minWidth: '0',
                        wordWrap: 'break-word', backgroundColor: '#fff',
                        backgroundClip: 'border-box', border: '1px solid rgba(0, 0, 0, .125',
                        borderRadius: '0.25rem', top: '-10px'}
                        }>
                        <div className="card-header d-flex mb-3">
                            <div className="col col mid-6" style={{ fontWeight: 'bold', fontSize: '16px', padding: '5px 10px'}}>Customer Data</div>
                            <Link to="/create" className="btn btn-success btn-lg" style={{  color: '#fff', fontWeight: 'bold', marginLeft: 'auto', padding: '10px 20px', fontSize: '12px', borderRadius: '2px' }}>
                                Add User
                            </Link>
                        </div>
                        <div className="card-body" style={{padding: '1px', margin: '-10px 20px', marginTop: '0'}}>
                            <div className="table-responsive" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch'}}>
                                <div className="dt-top" style={{ marginTop: '0px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="dt-entries">
                                        <label style={{display: 'inline-block'}}>
                                            <select className="dt-selector" style={{ padding: '6px'}} value={limit} onChange={handleLimitChange}>
                                                <option value="5" selected>5</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                            </select>
                                            entries per page
                                        </label>
                                    </div>
                                    <div className="dt-search">
                                        <input type="text" className="form-control me-2" placeholder="Search..." 
                                        style={{ display: 'flex', marginTop: '0px', width: '100%', padding: '6px 10px', margin: '5px' }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                    </div>
                                </div>
                                <div className="dt-container">
                                    <table className="table table-bordered table-striped dt-table">
                                                <thead>
                                                    <tr>
                                                        <th className="dt-sorter" style={{ backgroundColor: 'black', color: 'white'}}>
                                                            First Name
                                                        </th>
                                                        <th className="dt-sorter" style={{ backgroundColor: 'black', color: 'white'}}>
                                                            Last Name
                                                        </th>
                                                        <th className="dt-sorter" style={{ backgroundColor: 'black', color: 'white'}}>
                                                            Email
                                                        </th>
                                                        <th className="dt-sorter" style={{ backgroundColor: 'black', color: 'white'}}>
                                                            Age
                                                        </th>
                                                        <th className="dt-sorter" style={{ backgroundColor: 'black', color: 'white'}}>
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{borderColor: 'inherit', borderStyle: 'solid', borderWidth: '0'}}>
                                                    {
                                                        filteredData.map((user, index) => (
                                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-grey'}>
                                                                <td>{user.firstname}</td>
                                                                <td>{user.lastname}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.age}</td>
                                                                <td>
                                                                    <Link to={`/edit/${user._id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                                                                    <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                    </table>
                                </div>
                                <div className="dt-bottom" style={{padding: '8px 1px', display: 'flex', justifyContent: 'space-between'}}>
                                    <div className="dt-info" style={{ margin: '7px 0'}}>Showing 1 to {filteredData.length} of {totalEntries} entries</div>
                                    <div className="dt-pagination" style={{ marginLeft: '2px', padding: '6px 12px', color: 'inherit'}}>
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <button className="page-link" onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;</button>
                                            </li>
                                                {
                                                    Array.from({ length: totalPages }, (_, i) => (
                                                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1} </button>
                                                        </li>
                                                    ))
                                                }
                                            <li className="page-item">
                                                <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>&gt;</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    )
}

export default Users;