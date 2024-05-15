interface LoadingProps {
    type?: "text" | "default" | "spinner" |"bounce";
}

const Loading = ({ type = "default" }: LoadingProps) => {
    return (
        <>
            {type === "default" && (
                <div className="flex items-center space-x-2">
                    <div className="animate-pulse">●</div>
                    <div className="animate-pulse delay-200">●</div>
                    <div className="animate-pulse delay-400">●</div>
                </div>
            )}

            {type === "text" && (
                <div className="flex items-center space-x-2">
                    <div className="animate-pulse">•</div>
                    <div className="animate-pulse delay-200">•</div>
                    <div className="animate-pulse delay-400">•</div>
                </div>
            )}

            {type === "spinner" && (
                <svg
                    className="animate-spin -ml-1 mr-3 h-7 w-7 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            )}

            {type === "bounce" && (
                <div className="flex items-center space-x-2">
                    <div className="animate-bounce">●</div>
                    <div className="animate-bounce delay-200">●</div>
                    <div className="animate-bounce delay-400">●</div>
                </div>
            )}
        </>
    );
};

export default Loading;
