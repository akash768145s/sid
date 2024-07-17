'use client'
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import React, { useState } from 'react';

const UploadButton = () => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData, imageUrl })
        });

        if (response.ok) {
            alert('Product created successfully');
        } else {
            alert('Error creating product');
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <UploadDropzone
                appearance={{
                    container: {
                        border: '1px solid blue'
                    },
                    uploadIcon: {
                        color: 'blue'
                    }
                }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    setImageUrl(res[0].url);
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
            />
            {imageUrl.length ? (
                <div>
                    <Image src={imageUrl} alt='Uploaded Image' width={500} height={300} />
                </div>
            ) : null}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    required
                    className="border p-2"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Product Description"
                    required
                    className="border p-2"
                />
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Product Price"
                    required
                    className="border p-2"
                />
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Product Category"
                    required
                    className="border p-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Submit
                </button>
            </form>
        </main>
    );
};

export default UploadButton;
