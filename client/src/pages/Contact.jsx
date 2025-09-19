"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

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
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We're here to help. Reach out to us for support, questions, or emergency assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

            <div className="space-y-6">
              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="text-primary text-2xl">📞</div>
                  <div>
                    <h3 className="font-semibold mb-1">Emergency Hotline</h3>
                    <p className="text-muted-foreground">Available 24/7 for urgent medical assistance</p>
                    <p className="font-medium text-primary">+1-800-CARENET</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="text-primary text-2xl">✉️</div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Support</h3>
                    <p className="text-muted-foreground">General inquiries and support</p>
                    <p className="font-medium text-primary">support@carenet.org</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="text-primary text-2xl">🏥</div>
                  <div>
                    <h3 className="font-semibold mb-1">Medical Team</h3>
                    <p className="text-muted-foreground">Direct access to healthcare professionals</p>
                    <p className="font-medium text-primary">medical@carenet.org</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="text-primary text-2xl">🌍</div>
                  <div>
                    <h3 className="font-semibold mb-1">Multilingual Support</h3>
                    <p className="text-muted-foreground">Available in 8+ languages</p>
                    <p className="font-medium text-primary">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

            {isSubmitted ? (
              <div className="card text-center">
                <div className="text-primary text-4xl mb-4">✅</div>
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <div className="card">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="medical">Medical Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="general">General Question</option>
                      <option value="emergency">Emergency Assistance</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input"
                      rows="5"
                      placeholder="Describe your inquiry or concern..."
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-full">
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
