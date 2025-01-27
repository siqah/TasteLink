import  { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleError = (error, errorInfo) => {
            console.error("Error caught in ErrorBoundary:", error, errorInfo);
            setHasError(true);
        };

        // Add global error listener
        window.addEventListener('error', handleError);

        return () => {
            // Clean up the error listener
            window.removeEventListener('error', handleError);
        };
    }, []);

    if (hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
    }

    return children;
};

export default ErrorBoundary;
