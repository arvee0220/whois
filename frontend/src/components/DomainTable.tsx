import DomainIcon from "./icons/DomainIcon";

interface DomainData {
    domainName: string;
    registrar: string;
    registrationDate: string;
    expirationDate: string;
    estimatedDomainAge: string;
    hostnames: string[];
}

interface DomainTableProps {
    domainData: DomainData;
}

const DomainTable = ({ domainData }: DomainTableProps) => {
    const { domainName, registrar, registrationDate, expirationDate, estimatedDomainAge, hostnames } = domainData;

    return (
        <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DomainIcon />
                <span>Domain Information</span>
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
                            <td className="table-cell font-medium">{domainName}</td>
                            <td className="table-cell">{registrar}</td>
                            <td className="table-cell">{registrationDate}</td>
                            <td className="table-cell">{expirationDate}</td>
                            <td className="table-cell">{estimatedDomainAge}</td>
                            <td className="table-cell">{hostnames.concat(", ")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DomainTable;
