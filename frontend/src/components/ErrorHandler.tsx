import ErrorIcon from "./icons/ErrorIcon";

interface ErrorHandlerProps {
    error: string;
}

const ErrorHandler = ({ error }: ErrorHandlerProps) => {
    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
                <ErrorIcon />
                <p className="text-red-700 font-medium">Error</p>
            </div>
            <p className="text-red-600 mt-2">{error}</p>
        </div>
    );
};

export default ErrorHandler;
