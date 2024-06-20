import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/adminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';

const CreateCategory = () => {
    const [category, setCategory] = useState([]);

    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [newName, setNewName] = useState("");
    const [selected, setSelected] = useState(null);

    // create Category
    const CategoryFormSubmitter = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/category/create-category", { name });
            if (data?.success) {
                toast.success(`${name} is created Successfully`);
                GetAllCategory();
            } else {
                toast.error(data.massage)
            }
        } catch (error) {
            console.log(error)
            toast.error("Error in Setting Name")
        }
    }
    // Get all Category
    const GetAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-all-category");
            if (data?.success) {
                setCategory(data?.category)

            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong in getting categorys")
        }
    }
    useEffect(() => {
        GetAllCategory();
    }, [])

    // Edit Category
    const editCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: newName });
            if (data?.success) {
                toast.success(`${newName} is Updated Successfully`);
                setSelected(null);
                setNewName("");
                setVisible(false)
                GetAllCategory();
            } else {
                toast.error(data.massage)
            }
        } catch (error) {
            toast.error("Something Went Wrong In editCategory")
        }
    }
    // Handle delete
    const deleteCategory = async (pid) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${pid}`);
            if (data?.success) {
                toast.success(`Category is Deleted Successfully`);
                GetAllCategory();
            } else {
                toast.error(data.massage)
            }
        } catch (error) {
            toast.error("Something Went Wrong In editCategory")
        }
    }
    return (
        <Layout title={"Create-Category Ecommerce-app"}>
            <div className="container-fluid m-3 p-3">

                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage  Category</h1>
                        <div className='p-3 w-50'>
                            <CategoryForm CategoryFormSubmitter={CategoryFormSubmitter} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table table-bordered border-primary">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category?.map(item => (

                                        <tr key={item._id}>
                                            <td >{item.name}</td>
                                            <td>
                                                <button className='btn btn-primary' onClick={() => { setVisible(true); setNewName(item.name); setSelected(item) }}>
                                                    Edit
                                                </button>
                                                <button className='btn btn-danger ms-3' onClick={() => { deleteCategory(item._id) }}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)}
                            footer={null}
                            open={visible} >
                            <CategoryForm value={newName} setValue={setNewName} CategoryFormSubmitter={editCategory} />
                        </Modal>
                    </div>
                </div>
            </div>

        </Layout>


    )
}

export default CreateCategory
