
import { Button } from "../../../components/ui/button";
import { ProductInterface } from "../../../types";
import { Card, CardContent, CardFooter } from "../../../components/ui/card";
import toast from "react-hot-toast";
import axios from "axios";

interface ProductCardProps{
    product: ProductInterface,
    setOpenCreateProductsDialog : (openCreateProductsDialog:boolean)=>void
}
const ProductCard:React.FC<ProductCardProps> = ({
  product,
  setOpenCreateProductsDialog,
}) => {

    const handleDelete = async() =>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/product/delete/${product._id}`,'',{withCredentials:true})
            .then((res) => res.data);

            if(response.success === true){
                toast.success(response.message);
            }
        } catch (error:any) {
            const errorMsg = error?.response?.data?.message || "Something Went Wrong";
            toast.error(errorMsg);
        }
    }
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.images[0]}
            alt={product?.title}
            className="w-full h-[250px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
            //   setCurrentEditedId(product?._id);
            //   setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button 
          onClick={handleDelete}
          >Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ProductCard;