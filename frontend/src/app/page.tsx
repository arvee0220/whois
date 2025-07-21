import WhoisLookup from "@/components/WhoisLookup";

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">🔍 Whois Domain Lookup</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get comprehensive domain information and contact details instantly. Perfect for domain research, verification, and analysis.</p>
            </header>

            {/* Main Content */}
            <main>
                <WhoisLookup />
            </main>

            {/* Footer */}
            <footer className="text-center mt-16 py-8 border-t border-gray-200">
                <p className="text-gray-500">Powered by WhoisXML API • Built with Next.js & NestJS</p>
            </footer>
        </div>
    );
}
