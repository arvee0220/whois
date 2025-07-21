import { LookupType } from "@/definitions/lookup";
import { ChangeEvent, FC, FormEvent, JSX } from "react";

interface SearchFormProps {
    domain: string;
    setDomain: (domain: string) => void;
    lookupType: LookupType;
    setLookupType: (type: LookupType) => void;
    loading: boolean;
    handleSubmit: (e: FormEvent) => void;
    handleDomainChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchForm = ({ domain, setDomain, lookupType, setLookupType, loading, handleSubmit, handleDomainChange }: SearchFormProps) => {
    return (
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
    );
};

export default SearchForm;
