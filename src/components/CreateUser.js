import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CreateUser() {

    const [firstname, setFirst] = useState()
    const [lastname, setLast] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/create', {firstname, lastname, email, age })
            .then(res => {
                console.log(res);
                navigate('/');
                alert("User Added Successfully");
            })
            .catch(err => console.log(err))
    }

    const handleClose = () => {
        navigate('/');
    }

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#343a40'}}>
            <div className="modal-content" style={{position: 'relative', display: 'flex', flexDirection: 'column', width: '50%', pointerEvents: 'auto', backgroundClip: 'padding-box', }}>
                <div className="modal-header">
                    <h5 className="modal-title">Add User</h5>
                    <button className="btn-close" onClick={handleClose}></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstname" style={{marginBottom: '10px'}}>First Name</label>
                            <input 
                                type="text"
                                placeholder="example"
                                className="form-control"
                                onChange={(e) => setFirst(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" style={{marginBottom: '10px'}}>Last Name</label>
                            <input 
                                type="text"
                                placeholder="example"
                                className="form-control"
                                onChange={(e) => setLast(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" style={{marginBottom: '10px'}}>Email</label>
                            <input  
                                type="text"
                                placeholder="example@gmail.com"
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" style={{marginBottom: '10px'}}>Age</label>
                            <input 
                                type="text"
                                placeholder="1"
                                className="form-control"
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer" style={{marginBottom: '-15px', }}>
                        <button className="btn btn-success" style={{marginRight: '-10px'}}>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser 