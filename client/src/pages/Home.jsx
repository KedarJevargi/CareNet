"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "es", name: "Spanish", native: "Español" },
  { code: "fr", name: "French", native: "Français" },
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "fa", name: "Persian", native: "فارسی" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "so", name: "Somali", native: "Soomaali" },
  { code: "sw", name: "Swahili", native: "Kiswahili" },
]

const translations = {
  en: {
    title: "Carenet",
    tagline: "Providing compassionate medical assistance and healthcare guidance for refugees worldwide",
    getStarted: "Get Started",
    selectLanguage: "Select Your Language",
    features: "Our Services",
    feature1Title: "24/7 Medical Support",
    feature1Desc: "Access to healthcare professionals around the clock",
    feature2Title: "Multilingual Care",
    feature2Desc: "Medical assistance in your preferred language",
    feature3Title: "Confidential & Secure",
    feature3Desc: "Your health information is protected and private",
    feature4Title: "Emergency Guidance",
    feature4Desc: "Immediate help for urgent medical situations",
  },
  es: {
    title: "Carenet",
    tagline: "Brindando asistencia médica compasiva y orientación sanitaria para refugiados en todo el mundo",
    getStarted: "Comenzar",
    selectLanguage: "Selecciona tu idioma",
    features: "Nuestros Servicios",
    feature1Title: "Soporte Médico 24/7",
    feature1Desc: "Acceso a profesionales de la salud las 24 horas",
    feature2Title: "Atención Multilingüe",
    feature2Desc: "Asistencia médica en tu idioma preferido",
    feature3Title: "Confidencial y Seguro",
    feature3Desc: "Tu información de salud está protegida y es privada",
    feature4Title: "Orientación de Emergencia",
    feature4Desc: "Ayuda inmediata para situaciones médicas urgentes",
  },
}

function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const t = translations[selectedLanguage] || translations.en

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">{t.title}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">{t.tagline}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Language Selection */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8">{t.selectLanguage}</h2>
          <div className="language-grid">
            {languages.map((lang) => (
              <div
                key={lang.code}
                className={`language-item ${selectedLanguage === lang.code ? "active" : ""}`}
                onClick={() => setSelectedLanguage(lang.code)}
              >
                <div className="font-medium">{lang.name}</div>
                <div className="text-sm opacity-75">{lang.native}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Get Started Button */}
        <section className="text-center mb-16">
          <Link to="/signup" className="btn btn-primary text-lg px-8 py-4">
            {t.getStarted}
          </Link>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">{t.features}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <div className="text-primary text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold mb-2">{t.feature1Title}</h3>
              <p className="text-muted-foreground">{t.feature1Desc}</p>
            </div>
            <div className="card text-center">
              <div className="text-primary text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">{t.feature2Title}</h3>
              <p className="text-muted-foreground">{t.feature2Desc}</p>
            </div>
            <div className="card text-center">
              <div className="text-primary text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">{t.feature3Title}</h3>
              <p className="text-muted-foreground">{t.feature3Desc}</p>
            </div>
            <div className="card text-center">
              <div className="text-primary text-4xl mb-4">🚨</div>
              <h3 className="text-xl font-semibold mb-2">{t.feature4Title}</h3>
              <p className="text-muted-foreground">{t.feature4Desc}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
