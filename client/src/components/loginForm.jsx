import InputBar from "../common/inputBar.jsx";

function LoginForm() {
    return (
        <div className="fixed z-10 flex min-h-screen w-full justify-center items-center text-gray-400 pr-32">

            <form className="
                flex flex-col
                w-full max-w-[35%]
                min-h-[600px]
                bg-gradient-to-tr
                from-[#111C35]
                via-[#192640]
                to-[#26334A]
                gap-8
                p-10
                border border-gray-500
                rounded-xl
                ml-auto
                bg-blur-xl
                bg-white/10
            ">
                <span className="flex flex-col gap-4 mb-[1vh]">
                <p className="text-lg text-gray-400">Welcome back!</p>
                <p className="text-3xl text-blue-500">Sign in to your workspace</p>
                <p className="text-md text-gray-400">Enter your details to continue to Ohaki.</p>
                </span>

                <span>
                <p>Email <i className="text-red-500">*</i></p>
                <InputBar placeholder="Email" type="email" />
                </span>
                
                <span>
                <span className="flex"><p>Password <i className="text-red-500">*</i></p>
                <a className="ml-auto text-blue-400">Forgot password</a>
                </span>
                <InputBar placeholder="Password" type="password" />
                
                </span>

                <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-400 cursor-pointer"
                />
                Remember me
                </label>  

                <button type="submit" className="bg-blue-800 text-gray-400 h-[5vh] w-[100%] border border-gray-500 border-[1px] rounded-lg mt-auto">
                    Sign in
                </button>

                <span className="flex gap-1 justify-center w-full">
                <p>New to Ohaki?</p>
                <link to="/register" className="text-blue-400">Register here</link>
                </span>

                <hr></hr>

                <p className="text-center text-sm">Developer observability, simplified</p>

            </form>
        </div>
    );
}

export default LoginForm;