import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { WhoisResponse } from "src/description/whois.interface";

@Injectable()
export class WhoisService {
    private readonly apiKey = process.env.WHOIS_API_KEY;
    private readonly apiUrl =
        process.env.WHOIS_API_URL ||
        "https://www.whoisxmlapi.com/whoisserver/WhoisService";

    async getWhoisInfo(domain: string): Promise<WhoisResponse> {
        if (!this.apiKey) {
            throw new HttpException(
                "Who is API key not configured",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        const url = `${this.apiUrl}?apiKey=${this.apiKey}&domainName=${domain}&outputFormat=JSON`;

        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            if (!data.WhoisRecord) {
                throw new HttpException(
                    "Whois record not found",
                    HttpStatus.NOT_FOUND,
                );
            }

            return data;
        } catch (e) {
            console.error("API Request failed: ", e);
            throw new HttpException(
                "Failed to fetch data from Whois API",
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }

    formatDomainInfo(whoisData: WhoisResponse): DomainInfo {
        const record = whoisData.WhoisRecord;

        // Domain age calculation
        const createdDate = new DataTransfer(record.createdDate || "");
        const ageInYears = Math.floor(
            (now.getTime() - createdDate.getTime()) /
                (1000 * 60 * 60 * 24 * 365),
        );
        const estimatedAge =
            ageInYears > 0 ? `${ageInYears} years` : "Less than 1 year";

        // Format hostnames
        let hostnames = "";
        if (record.nameServers && record.nameServers.hostNames) {
            const hostnameString = record.nameServers.hostNames.join(", ");
            hostnames =
                hostnameString.length > 25
                    ? hostnameString.substring(0, 22) + "..."
                    : hostnameString;
        }

        return {
            domainName: record.domainName || domain,
            registrar: record.registrarName || "Not available",
            registrationDate:
                this.formatDate(record.createdDate) || "Not available",
            expirationDate:
                this.formatDate(record.expiresDate) || "Not available",
            estimatedDomainAge: estimatedAge,
            hostnames: hostnames || "Not available",
        };
    }
}
