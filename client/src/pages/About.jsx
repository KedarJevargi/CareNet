import { Link } from "react-router-dom"

function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="navbar">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              Carenet
            </Link>
            <div className="flex space-x-6">
              <Link to="/chat" className="text-foreground hover:text-primary transition-colors">
                Chat
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About Carenet</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Bridging healthcare gaps for refugees worldwide through compassionate, accessible, and multilingual medical
            assistance.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="card">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto text-pretty">
              Carenet exists to provide immediate, accessible healthcare guidance to refugees and displaced individuals
              who face barriers to traditional medical care. We believe that everyone deserves quality healthcare,
              regardless of their circumstances or location.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-primary text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Compassion</h3>
              <p className="text-muted-foreground">
                We approach every interaction with empathy, understanding the unique challenges faced by refugees.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-primary text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-muted-foreground">
                Healthcare should be available to everyone, everywhere, in their preferred language.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-primary text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Privacy</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards of confidentiality and data protection.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-primary text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Responsiveness</h3>
              <p className="text-muted-foreground">
                Quick access to medical guidance when you need it most, available 24/7.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-primary text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-muted-foreground">
                Evidence-based medical guidance from qualified healthcare professionals.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-primary text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3">Hope</h3>
              <p className="text-muted-foreground">
                Providing not just medical care, but hope and dignity to those who need it most.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Provide</h2>
          <div className="space-y-8">
            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="text-primary text-3xl">🩺</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Medical Consultation</h3>
                  <p className="text-muted-foreground">
                    Connect with qualified healthcare professionals for symptom assessment, treatment guidance, and
                    health advice tailored to your specific situation.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="text-primary text-3xl">🚨</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Emergency Guidance</h3>
                  <p className="text-muted-foreground">
                    Immediate assistance for urgent medical situations, including guidance on when to seek emergency
                    care and what steps to take.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="text-primary text-3xl">💊</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Medication Support</h3>
                  <p className="text-muted-foreground">
                    Information about medications, potential interactions, and guidance on managing chronic conditions
                    with limited resources.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start space-x-4">
                <div className="text-primary text-3xl">🗺️</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Healthcare Navigation</h3>
                  <p className="text-muted-foreground">
                    Help finding local healthcare resources, understanding healthcare systems, and connecting with
                    appropriate medical facilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="card bg-primary text-primary-foreground">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of refugees who have found hope and healing through Carenet.
            </p>
            <Link to="/signup" className="btn bg-white text-primary hover:bg-gray-100">
              Create Your Account
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
