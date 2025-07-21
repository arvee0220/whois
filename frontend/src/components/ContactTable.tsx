import ContactIcon from "./icons/ContactIcon";

interface ContactData {
    registrantName: string;
    technicalContactName: string;
    administrativeContactName: string;
    contactEmail: string;
}

interface ContactTableProps {
    contactData: ContactData;
}

const ContactTable = ({ contactData }: ContactTableProps) => {
    const { registrantName, technicalContactName, administrativeContactName, contactEmail } = contactData;

    return (
        <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ContactIcon />
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
                            <td className="table-cell">{registrantName}</td>
                            <td className="table-cell">{technicalContactName}</td>
                            <td className="table-cell">{administrativeContactName}</td>
                            <td className="table-cell">{contactEmail}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactTable;
