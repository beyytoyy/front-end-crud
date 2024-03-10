import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [firstname, setFirst] = useState();
    const [lastname, setLast] = useState()
    const [email, setEmail] = useState();
    const [age, setAge] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/get/${id}`);
                setFirst(response.data.firstname);
                setLast(response.data.lastname);
                setEmail(response.data.email);
                setAge(response.data.age);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/update/${id}`, { firstname, lastname, email, age });
            navigate("/");
            alert("User Updated Successfully");
        } catch (err) {
            console.log(err);
        }
    };

    const handleClose = () => {
        navigate('/')
    }

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#343a40'}}>
            <div className="modal-content" style={{position: 'relative', display: 'flex', flexDirection: 'column', width: '50%', pointerEvents: 'auto', backgroundClip: 'padding-box', }}>
                <div className="modal-header">
                    <h5 className="modal-title">Edit User</h5>
                    <button className="btn-close" onClick={handleClose}></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="firstname" style={{marginBottom: '10px'}}>First Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="example"
                                className="form-control"
                                value={firstname}
                                onChange={(e) => setFirst(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="lastname" style={{marginBottom: '10px'}}>Last Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="example"
                                className="form-control"
                                value={lastname}
                                onChange={(e) => setLast(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" style={{marginBottom: '10px'}}>Email</label>
                            <input
                                id="email"
                                type="text"
                                placeholder="example@gmail.com"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="age" style={{marginBottom: '10px'}}>Age</label>
                            <input
                                id="age"
                                type="text"
                                placeholder="12"
                                className="form-control"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer" style={{marginBottom: '-15px', }}>
                            <button type="submit" className="btn btn-success" style={{marginRight: '-10px'}}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;
