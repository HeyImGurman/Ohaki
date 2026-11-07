function InputBar({ type, placeholder }) {
    return (
        <input placeholder={placeholder} type={type} className="border border-blue-400 rounded-lg h-full min-h-[40px] p-2 text-gray-400 w-full max-w-[100%] bg-[#0b0e15]"></input>
    );
}

export default InputBar;