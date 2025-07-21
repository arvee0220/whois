"use client";

import { ContactInfo, DomainInfo, LookupType } from "@/definitions/lookup";
import { useState } from "react";
import SearchForm from "./SearchForm";
import DomainTable from "./DomainTable";
import ErrorHandler from "./ErrorHandler";
import ContactTable from "./ContactTable";
import Tips from "./Tips";

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
            <SearchForm
                domain={domain}
                setDomain={setDomain}
                handleDomainChange={handleDomainChange}
                handleSubmit={handleSubmit}
                loading={loading}
                lookupType={lookupType}
                setLookupType={setLookupType}
            />

            {error && <ErrorHandler error={error} />}

            {domainData && (
                <DomainTable
                    domainData={{
                        ...domainData,
                        hostnames: Array.isArray(domainData.hostnames) ? domainData.hostnames : domainData.hostnames ? [domainData.hostnames] : []
                    }}
                />
            )}

            {contactData && <ContactTable contactData={contactData} />}

            {/* Help Text */}
            <Tips />
        </div>
    );
};

export default WhoisLookup;
