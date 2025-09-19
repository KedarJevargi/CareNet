"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        "Hello! I'm here to help you with your medical concerns. Please describe your symptoms or health questions, and I'll provide guidance and assistance.",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content:
          "Thank you for sharing your symptoms. Based on what you've described, I recommend consulting with a healthcare professional for a proper evaluation. In the meantime, here are some general suggestions that might help...",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
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
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Chat Interface */}
      <div className="chat-container">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Medical Assistance Chat</h1>
          <p className="text-muted-foreground">Describe your symptoms and get personalized medical guidance</p>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="font-medium mb-1">{message.type === "user" ? "You" : "Medical Assistant"}</div>
              <div>{message.content}</div>
              <div className="text-xs opacity-75 mt-2">{message.timestamp.toLocaleTimeString()}</div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant">
              <div className="font-medium mb-1">Medical Assistant</div>
              <div>Analyzing your symptoms...</div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Describe your symptoms or ask a medical question..."
            className="form-input flex-1"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !inputMessage.trim()} className="btn btn-primary px-6">
            Send
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>
            ⚠️ This is for informational purposes only and does not replace professional medical advice. Always consult
            with a healthcare provider for serious medical concerns.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Chat
