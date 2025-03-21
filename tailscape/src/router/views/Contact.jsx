import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Optional if you need navigation after form submission
import { Button } from '../../components/ui/Button';
import { TextArea } from '../../components/ui/TextArea';
import { Input } from '../../components/ui/Input';
import FadeInOnScroll from '../../utilities/FadeInOnScroll';
import axios from 'axios';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = `http://localhost:5000/api/contact-message`;

    const payload = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send the message. Please try again later.');
      }

      setStatus({
        success: true,
        message: 'Message sent successfully! We will get back to you soon.',
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

    } catch (error) {
      setStatus({
        success: false,
        message: error.message || 'An unexpected error occurred.',
      });
    }
  };

  return (
    <FadeInOnScroll>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-200">
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-extrabold text-center text-black-700 mb-12">
            Contact Us
          </h1>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-black-800 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We're here to help! If you have any questions, concerns, or just
                want to say hello, please don't hesitate to reach out to us.
              </p>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-indigo-900">Address:</h3>
                  <p>123 Pet Street, Animalville, PA 12345</p>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-900">Phone:</h3>
                  <p>(123) 456-7890</p>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-900">Email:</h3>
                  <p>info@petpalsstore.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-900">Hours:</h3>
                  <p>Monday - Friday: 9am - 7pm</p>
                  <p>Saturday: 10am - 6pm</p>
                  <p>Sunday: 12pm - 5pm</p>
                </div>
              </div>
            </div>

            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <TextArea
                    id="message"
                    name="message"
                    row={5}
                    value={formData.message}
                    onChange={(e) => handleChange({ ...e, target: { ...e.target, name: 'message' } })}
                    required
                  />
                </div>
                <Button type="submit" 
                classes="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300">
                  Send Message
                </Button>
              </form>
              {status.message && (
                <p
                  className={`mt-4 text-center ${
                    status.success ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {status.message}
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </FadeInOnScroll>
  );
}
