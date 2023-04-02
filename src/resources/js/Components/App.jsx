import { useEffect, useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import '../../css/App.css'
import DeleteProduct from "./DeleteProduct.jsx";
import Form from 'react-bootstrap/Form';

function App() {
    const [data, setData] = useState([])
    const [showNewProduct, setShowNewProduct] = useState(false);
    const handleNewProductClose = () => setShowNewProduct(false);
    const handleNewProductShow = () => setShowNewProduct(true);

    const [showEditProduct, setShowEditProduct] = useState(false);
    const handleEditProductClose = () => setShowEditProduct(false);
    const handleEditProductShow = () => setShowEditProduct(true);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const [editName, setEditName] = useState("");
    const [editPrice, setEditPrice] = useState("");

    const url = 'http://localhost:8000';

    const changeData = (data) => {
        setData(data);
    };

    const fetchData = () => {
        fetch(url+"/api/get_products")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setData(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleClick = (str, data=null) => () => {
        setId(data.id);
        setName(data.name);
        setEditName(data.name);
        setEditPrice(data.price);
        if (str === 'new') {
            handleNewProductShow();
        } else if (str === 'edit') {
            handleEditProductShow();
        }
    };

    const handleNewProduct = () => {
        if (name !== '' && price !== '') {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: name, price: price})
            };
            fetch(url+'/api/add_product', requestOptions)
                .then(response => response.json());
        }
    }

    const handleEditProduct = () => {
        if (editName !== '' && editPrice !== '') {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: editName, price: editPrice})
            };
            fetch(url+'/api/update_product/' + id, requestOptions)
                .then(response => response.json());
        }
    }

    return (
        <div className="col-xs-1 App" align="center">
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h2>Products</h2>
                    </div>
                    <div className="col-sm">
                        <button type="button" className="btn btn-primary" onClick={handleClick('new',[])} >New Product</button>
                    </div>
                </div>
            </div>

            {data.length > 0 ? (
                <div>
                    <table className="table bg-light">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button type="button" className="btn btn-dark mr-3" onClick={handleClick('edit',{'id': item.id, 'name': item.name, 'price': item.price})}>Edit</button>
                                    <DeleteProduct changeData={changeData} id_product={item.id}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="col-xs-1 alert alert-dark" align="center">
                    <h3>Empty 🤔</h3>
                </div>
            )}
            <Modal show={showNewProduct} onHide={handleNewProductClose}>
                <Modal.Header>
                    <Modal.Title>New Product</Modal.Title>
                    <Button variant="secondary" onClick={handleNewProductClose}>
                        Close
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={name}
                                          onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Price" value={price}
                                          onChange={(e) => setPrice(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleNewProduct}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showEditProduct} onHide={handleEditProductClose}>
                <Modal.Header >
                    <Modal.Title>Edit {name}</Modal.Title>
                    <Button variant="secondary" onClick={handleEditProductClose}>
                        Close
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <input type='hidden' value={id}/>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={editName}
                                          onChange={(e) => setEditName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Price" value={editPrice}
                                          onChange={(e) => setEditPrice(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleEditProduct}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <div className='border-top'>
                <a href={url+'/endpoints'}>API Endpoints</a>
            </div>
        </div>
    )
}

export default App

