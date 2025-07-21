const Tips = () => (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">💡 Pro Tips:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
            <li>
                • Try testing with domain: <code className="bg-blue-100 px-1 rounded">amazon.com</code>
            </li>
            <li>• Domain information shows registration details and nameservers</li>
            <li>• Contact information displays registrant and administrative contacts</li>
            <li>• Some domains may have privacy protection enabled</li>
        </ul>
    </div>
);

export default Tips;
