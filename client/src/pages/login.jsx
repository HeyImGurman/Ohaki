import LoginForm from "../components/loginForm";
import Logo from "../assets/OhakiLogo.png"

function LoginPage() {
    return (
        <div>

        <div className="flex flex-row w-full">
        <img
                src={Logo}
                alt="Ohaki"
                className="w-[200px] h-auto fixed m-8"
            />

        <p ml-auto>Built for developers</p>
        </div>
        
        <div className="fixed z-50 flex w-full h-full pt-[15%] pl-32 flex-col gap-2">

            <p className="text-white text-7xl">Ship with clarity.</p>
            <p className="text-blue-400 text-7xl">Operate with</p>
            <p className="text-blue-400 text-7xl">Confidence.</p>

            <p className="mt-4 text-gray-400 text-md">Keep every application healthy with a calm,<br /> focused workspace for the signals that matter.</p>
        </div>

        <LoginForm />

        </div>
    )
}

export default LoginPage;