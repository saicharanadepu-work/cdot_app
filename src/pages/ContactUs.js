import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Basic validation: fields required by HTML
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill all fields');
      return;
    }
    // You can integrate backend API call here
    setSubmitted(true);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Contact Us</h2>

      <div className="mb-4">
        <h5>Company Info</h5>
        <p>cdot Distribution Inc.</p>
        <p>123 Tobacco Lane, Leaf City, Country</p>
        <p>Email: info@tobaccodist.com</p>
        <p>Phone: +1 (555) 123-4567</p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-floating mb-3">
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-3">
            <textarea
              id="message"
              name="message"
              className="form-control"
              placeholder="Your message"
              style={{ height: '150px' }}
              value={formData.message}
              onChange={handleChange}
              required
            />
            <label htmlFor="message">Message</label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Send Message
          </button>
        </form>
      ) : (
        <div className="alert alert-success">
          Thank you for contacting us! We will get back to you shortly.
        </div>
      )}
    </div>
  );
}

export default ContactUs;
