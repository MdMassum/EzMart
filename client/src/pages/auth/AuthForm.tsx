import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../../components/Button";
import Input from "../../components/Input";
import LoadingModal from "../../components/loading";
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/authSlice.ts";
import { AuthResponse } from "../../types";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const dispatch = useDispatch();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [loading, setLoading] = useState<boolean>(false);

    const toggleVariant = useCallback(() => {
        setVariant((prevVariant) =>
            prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'
        );
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        const url = `${import.meta.env.VITE_SERVER_URL}/api/auth`;

        try {
            let response: AuthResponse;

            if (variant === 'REGISTER') {

                dispatch(signInStart());
                response = await axios.post(`${url}/signUp`, data,{withCredentials:true}).then((res) => res.data);

                toast.success("Registered Successfully");
                dispatch(signInSuccess(response.user));
                
            } else {

                dispatch(signInStart());
                response = await axios.post(`${url}/signIn`, data,{withCredentials:true}).then((res) => res.data);

                toast.success("Signed in Successfully");
                dispatch(signInSuccess(response.user));
            }
        } catch (error: any) {

            const errorMsg = error?.response?.data?.message || "An error occurred";
            toast.error(errorMsg);
            dispatch(signInFailure(errorMsg));

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <LoadingModal loading={loading} />}
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        {variant === 'REGISTER' && (
                            <Input id="name" label="Name" errors={errors} register={register} disabled={loading} />
                        )}
                        <Input id="email" label="Email" errors={errors} register={register} disabled={loading} />
                        <Input id="password" label="Password" errors={errors} register={register} disabled={loading} />
                        <div>
                            <Button fullWidth type="submit" disabled={loading}>
                                {variant === 'LOGIN' ? "Sign in" : "Register"}
                            </Button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-center text-sm mt-10 px-2 text-gray-500">
                        <div>
                            {variant === "LOGIN" ? "New to EzMart?" : "Already Have an Account?"}
                        </div>
                        <div onClick={toggleVariant} className="underline cursor-pointer">
                            {variant === "LOGIN" ? "Create an Account" : "Login"}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthForm;
