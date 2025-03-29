import { useTranslation } from "react-i18next";

function Home() {
    const { t } = useTranslation();

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1 className="text-3xl font-bold">Welcome to the app!</h1>
            <h2 className="text-xl font-bold">Mehr Hass</h2>
        </main>
    );
}

export default Home;