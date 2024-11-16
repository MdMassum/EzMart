
import { Fragment, useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";
import ProductForm from "./ProductForm";
import axios from "axios";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";
import { ProductInterface } from "../../../types";



const AdminProducts : React.FC = () =>{
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

//   const { productList } = useSelector((state) => state.adminProducts);
//   const dispatch = useDispatch();

const [productList,setProductList] = useState<ProductInterface[]>([]);
console.log("products",productList)


  // function handleDelete(getCurrentProductId) {
  //   dispatch(deleteProduct(getCurrentProductId)).then((data) => {
  //     if (data?.payload?.success) {
  //       dispatch(fetchAllProducts());
  //     }
  //   });
  // }

  const fetchAllProducts = async() =>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/product/getAll`,{withCredentials:true})
      .then((res) => res.data);
      if(response.success === true){

        setProductList(response.products);
      }

    } catch (error:any) {
      const errorMsg = error?.response?.data?.message || "An error occurred";
      toast.error(errorMsg);
    }
  }
  useEffect(() => {
    fetchAllProducts()
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col">
      <div className="mb-2  flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <ProductCard
                // setFormData={setFormData}
                key={productItem._id}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                // setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                // handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {"Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <ProductForm/>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;