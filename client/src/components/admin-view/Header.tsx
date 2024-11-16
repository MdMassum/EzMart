import axios from "axios";
import {Button} from "../ui/button"
import {AlignJustify, LogOut} from 'lucide-react'
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signOutFailure, signOutStart, signOutSuccess } from "../../redux/authSlice.ts";

interface HeaderProps {
  setOpen: (open: boolean) => void;
}
const Header:React.FC<HeaderProps> = ({ setOpen }) => {

  const dispatch = useDispatch();

  const handleLogout = async() =>{

    try {

      dispatch(signOutStart());
      const resp = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`
      ,{withCredentials:true}).then((res)=>res.data);

      console.log(resp);
      toast.success("Logout Successfully");
      dispatch(signOutSuccess());

    } catch (error:any) {

      const errorMsg = error?.response?.data?.message || "An error occurred";
      toast.error(errorMsg);
      dispatch(signOutFailure(errorMsg));
    }
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="md:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  )
}

export default Header