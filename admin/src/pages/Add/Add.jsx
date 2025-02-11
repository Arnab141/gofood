import React, { useState } from 'react';
import axios from 'axios';
import './Add.css';
import { assets } from '../../assets/admin_assets/assets';
import { toast } from 'react-toastify';

function Add({url}) {
    
    
    const [imagePreview, setImagePreview] = useState(assets.upload_area);
    const [imageFile, setImageFile] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: '',
        category: "Salad"
    });

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);  
            setImagePreview(URL.createObjectURL(e.target.files[0]));  
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", imageFile);  

        try {
            const response = await axios.post(`${url}/api/food/add`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.data.success) {
                setData({ name: "", description: "", price: '', category: "Salad" });
                setImagePreview(assets.upload_area);
                setImageFile(null);
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message);
                console.error("Error adding food:", response.data.message);
            }
        } catch (error) {
            
            console.error("Error:", error);
        }
    };

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={imagePreview} alt="Uploaded Preview" />
                    </label>
                    <input onChange={handleImageChange} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={handleDataChange} value={data.name} type="text" name="name" placeholder="Type here" required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={handleDataChange} value={data.description} name="description" rows="6" placeholder="Write content here" required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={handleDataChange} name="category" value={data.category} required>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Chiken">Chiken</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={handleDataChange} value={data.price} type="number" name="price" placeholder="100/-" required />
                    </div>
                </div>
                <button type="submit" className="add-button">ADD</button>
            </form>
        </div>
    );
}

export default Add;
