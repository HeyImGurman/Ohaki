import RegisterForm from "../components/registerForm";

function RegisterPage() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
            <div className="w-full h-full fixed bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.3),_transparent_700px)]"></div>
            <div className="fixed z-5 flex w-full h-full pt-[15%] pl-32 flex-col gap-2">
                <p className="text-white text-7xl">Ship with clarity.</p>
                <p className="text-blue-400 text-7xl">Operate with</p>
                <p className="text-blue-400 text-7xl">Confidence.</p>
                <p className="mt-4 text-gray-400 text-md">Keep every application healthy with a calm,<br /> focused workspace for the signals that matter.</p>
            </div>

            <RegisterForm />
        </div>
    );
}

export default RegisterPage;