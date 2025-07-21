"use client";

import { ContactInfo, DomainInfo, LookupType } from "@/definitions/lookup";
import { useState } from "react";

const WhoisLookup: React.FC = () => {
    const [domain, setDomain] = useState<string>("");
    const [lookupType, setLookupType] = useState<LookupType>("domain");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [domainData, setDomainData] = useState<DomainInfo | null>(null);
    const [contactData, setContactData] = useState<ContactInfo | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!domain.trim()) {
            setError("Please enter a domain name");
            return;
        }

        setLoading(true);
        setError("");
        setDomainData(null);
        setContactData(null);

        try {
            const response = await fetch(`http://localhost:5000/whois/${encodeURIComponent(domain.trim())}?type=${lookupType}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (lookupType === "domain") {
                setDomainData(data);
            } else {
                setContactData(data);
            }
        } catch (err) {
            console.error("Lookup failed:", err);
            setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDomain(e.target.value);
        if (error) setError(""); // Clear error when user starts typing
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Search Form */}
            <div className="card mb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                            Domain Name
                        </label>
                        <input type="text" id="domain" value={domain} onChange={handleDomainChange} placeholder="e.g., amazon.com" className="input-field" disabled={loading} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Information Type</label>
                        <div className="flex gap-6">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    value="domain"
                                    checked={lookupType === "domain"}
                                    onChange={(e) => setLookupType(e.target.value as LookupType)}
                                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                                    disabled={loading}
                                />
                                <span className="ml-2 text-gray-700">Domain Information</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    value="contact"
                                    checked={lookupType === "contact"}
                                    onChange={(e) => setLookupType(e.target.value as LookupType)}
                                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                                    disabled={loading}
                                />
                                <span className="ml-2 text-gray-700">Contact Information</span>
                            </label>
                        </div>
                    </div>

                    <button type="submit" disabled={loading || !domain.trim()} className="btn-primary w-full sm:w-auto">
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Looking up...
                            </>
                        ) : (
                            "Lookup Domain"
                        )}
                    </button>
                </form>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-700 font-medium">Error</p>
                    </div>
                    <p className="text-red-600 mt-2">{error}</p>
                </div>
            )}

            {/* Domain Information Table */}
            {domainData && (
                <div className="card">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 0L9 9m4-4v6m0 0v6m0-6h6m-6 0H9" />
                        </svg>
                        Domain Information
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                            <thead>
                                <tr>
                                    <th className="table-header">Domain Name</th>
                                    <th className="table-header">Registrar</th>
                                    <th className="table-header">Registration Date</th>
                                    <th className="table-header">Expiration Date</th>
                                    <th className="table-header">Estimated Domain Age</th>
                                    <th className="table-header">Hostnames</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="table-cell font-medium">{domainData.domainName}</td>
                                    <td className="table-cell">{domainData.registrar}</td>
                                    <td className="table-cell">{domainData.registrationDate}</td>
                                    <td className="table-cell">{domainData.expirationDate}</td>
                                    <td className="table-cell">{domainData.estimatedDomainAge}</td>
                                    <td className="table-cell">{domainData.hostnames}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Contact Information Table */}
            {contactData && (
                <div className="card">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        Contact Information
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                            <thead>
                                <tr>
                                    <th className="table-header">Registrant Name</th>
                                    <th className="table-header">Technical Contact Name</th>
                                    <th className="table-header">Administrative Contact Name</th>
                                    <th className="table-header">Contact Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="table-cell">{contactData.registrantName}</td>
                                    <td className="table-cell">{contactData.technicalContactName}</td>
                                    <td className="table-cell">{contactData.administrativeContactName}</td>
                                    <td className="table-cell">{contactData.contactEmail}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Help Text */}
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
        </div>
    );
};

export default WhoisLookup;