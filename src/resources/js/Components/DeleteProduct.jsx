const url = 'http://localhost:8000';
function DeleteProduct({id_product}) {

    const handleDelete = () => {
        fetch(url+'/api/remove_product/'+id_product, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        location.reload();
    }

        return (
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
        );
}

export default DeleteProduct;
