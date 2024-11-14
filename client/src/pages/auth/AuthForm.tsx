
import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import LoadingModal from "../../components/loading";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {

    const navigate = useNavigate();
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [loading, setLoading] = useState(false);

    useEffect(()=>{

    },[])

    const toggleVariant = useCallback(() => {
        setVariant((prevVariant) => 
            prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'
        );
    }, []);

    const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name : '',
            email:'',
            password:''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{

        setLoading(true);
        console.log(data);
        if (variant === 'REGISTER') {

        }

        if (variant === 'LOGIN') {
            // navigate('/')
        }
    }

  return (
    <>
        {loading && <LoadingModal loading={loading} /> }
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    { variant === 'REGISTER' && (
                        <Input id="name" label="Name" errors={errors} register={register} disabled={loading}/>
                    )}

                    <Input id="email" label="Email" errors={errors} register={register} disabled={loading}/>

                    <Input id="password" label="Password" errors={errors} register={register} disabled={loading}/>

                    <div>
                        <Button
                        fullWidth
                        type="submit"
                        disabled={loading}
                        >{variant === 'LOGIN' ? "Sign in" : "Register"}
                        </Button>
                    </div>

                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"/>
                        </div>
                    </div>
                </div>

            <div className="flex gap-2 justify-center text-sm mt-10 px-2 text-gray-500">
                <div>
                    {variant === "LOGIN" ? "New to EzMart?" : "Already Have an Account?"}
                </div>
                <div
                onClick={toggleVariant}
                className="underline cursor-pointer">
                    {variant === "LOGIN" ? "Create an Account" : "Login"}
                </div>
            </div>
            </div>

        </div>
    </>
  )
}

export default AuthForm