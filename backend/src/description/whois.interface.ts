export interface WhoisResponse {
    WhoisRecord: {
        domainName: string;
        registrarName: string;
        createdDate: string;
        expiresDate: string;
        nameServers: {
            hostNames: string[];
        };
        registrant: {
            name: string;
            email: string;
        };
        technicalContact: {
            name: string;
            email: string;
        };
        administrativeContact: {
            name: string;
            email: string;
        };
    };
}

export interface DomainInfo {
    domainName: string;
    registrar: string;
    registrationDate: string;
    expirationDate: string;
    estimatedDomainAge: string;
    hostnames: string;
}

export interface ContactInfo {
    registrantName: string;
    technicalContactName: string;
    administrativeContactName: string;
    contactEmail: string;
}
