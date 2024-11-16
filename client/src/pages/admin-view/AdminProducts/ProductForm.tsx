import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../../../components/ui/button";
import Input from "../../../components/Input";
import LoadingModal from "../../../components/loading";
import Select from "../../../components/Select";

const CategoryOptions = [
    {
        value: "mens",
        label: "Mens"
    },
    {
        value: "women",
        label: "Women"
    },
    {
        value: "child",
        label: "Child"
    }
];

const ProductForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            images: [],
            title: "",
            description: "",
            category: "",
            price: "",
            salePrice: "",
            totalStock: "",
            averageReview: 0,
        }
    });

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length + imageUrls.length > 6) {
            toast.error("You can upload a maximum of 6 images.");
            return;
        }

        setLoading(true);
        const uploadPromises = files.map(file => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

            return axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
                formData
            ).then(response => response.data.secure_url);
        });

        try {
            const uploadedUrls = await Promise.all(uploadPromises);
            setImageUrls(prev => [...prev, ...uploadedUrls]);
            toast.success("Images uploaded successfully!");
        } catch (error) {
            toast.error("Image upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (imageUrls.length > 0) {
            data.images = imageUrls;
        }
        console.log(data);
        // Submit the form data to your server or API here.
    };

    return (
        <>
            {loading && <LoadingModal loading={loading} />}
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                <div>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Upload Images (Max 6)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                disabled={loading}
                                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                            />
                            {imageUrls.length > 0 && (
                                <div className="mt-2 grid grid-cols-3 gap-2">
                                    {imageUrls.map((url, index) => (
                                        <img key={index} src={url} alt={`Uploaded ${index + 1}`} className="w-full h-auto rounded-md" />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Other form fields */}
                        <Input id="title" label="Title" errors={errors} register={register} disabled={loading} />
                        <Input id="description" label="Description" errors={errors} register={register} disabled={loading} />
                        <Select id="category" label="Category" errors={errors} register={register} options={CategoryOptions} />
                        <Input id="price" label="Price" type="number" errors={errors} register={register} disabled={loading} />
                        <Input id="salePrice" label="Sale Price" type="number" errors={errors} register={register} disabled={loading} />
                        <Input id="totalStock" label="Stock Quantity" type="number" errors={errors} register={register} disabled={loading} />
                        
                        <div className="w-full flex justify-center align-center">
                            <Button type="submit" disabled={loading}>
                                Create Product
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProductForm;
