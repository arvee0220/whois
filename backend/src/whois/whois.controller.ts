import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Query,
} from "@nestjs/common";
import { WhoisService } from "./whois.service";

@Controller("whois")
export class WhoisController {
    constructor(private readonly whoisService: WhoisService) {}

    @Get(":domain")
    async getWhoisData(
        @Param("domain") domain: string,
        @Query("type") type: "domain" | "contact",
    ) {
        if (!domain || !type) {
            throw new HttpException(
                "Domain and type parameters are required",
                HttpStatus.BAD_REQUEST,
            );
        }

        if (!["domain", "contact"].includes(type)) {
            throw new HttpException(
                `Type must be either "domain" or "contact"`,
                HttpStatus.BAD_REQUEST,
            );
        }

        // Domain validation
        const domainRegex =
            /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
        if (!domainRegex.test(domain)) {
            throw new HttpException(
                "Invalid domain format",
                HttpStatus.BAD_REQUEST,
            );
        }
        try {
            const whoisData = await this.whoisService.getWhoisInfo(domain);

            if (type === "domain") {
                return this.whoisService.formatDomainInfo(whoisData);
            } else {
                return this.whoisService.formatContactInfo(whoisData);
            }
        } catch (e: unknown) {
            console.error("Whois lookup error: ", e);

            if (e instanceof Error) {
                throw new HttpException(
                    e.message,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
            throw new HttpException(
                "Failed to fetch Whois data",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
