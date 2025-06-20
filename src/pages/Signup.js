import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    address1: "",
    address2: "",
    city: "",
    country: "United States",
    state: "",
    zipCode: "",
    addressType: "Residential",
    exciseTax: "No",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    phone: "",
    phoneType: "Home",
    birthday: "",
    subscribe: false,
  });

  const [licenseFile, setLicenseFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setLicenseFile(e.target.files[0]);
  };

  const signupApiCall = async (data, file) => {
    const form = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      // convert boolean to string since backend expects strings for form params
      form.append(key, typeof value === "boolean" ? value.toString() : value);
    });

    form.append("licenseFile", file);

    const response = await axios.post("http://localhost:8080/api/signup", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email !== formData.confirmEmail) {
      alert("Emails do not match");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!licenseFile) {
      alert("Please upload your license file.");
      return;
    }

    try {
      const msg = await signupApiCall(formData, licenseFile);
      alert(msg || "Signup successful! Pending approval.");
      // Optionally reset form here
    } catch (error) {
      console.error(error);
      alert(
        (error.response && error.response.data) ||
          "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "800px" }}>
        <h3 className="mb-4 text-center text-primary">
          Join Cigars Distribution of Texas
        </h3>
        <form onSubmit={handleSubmit} className="row g-3">
          {/* First Name */}
          <div className="col-md-6">
            <input
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          {/* Last Name */}
          <div className="col-md-6">
            <input
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
          {/* Company Name */}
          <div className="col-md-12">
            <input
              className="form-control"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              required
            />
          </div>
          {/* Address 1 */}
          <div className="col-md-12">
            <input
              className="form-control"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              placeholder="Address Line 1"
              required
            />
          </div>
          {/* Address 2 */}
          <div className="col-md-12">
            <input
              className="form-control"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Address Line 2 (Optional)"
            />
          </div>
          {/* City */}
          <div className="col-md-6">
            <input
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </div>
          {/* State */}
          <div className="col-md-6">
            <input
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
          </div>
          {/* Zip Code */}
          <div className="col-md-6">
            <input
              className="form-control"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="ZIP Code"
              required
            />
          </div>
          {/* Address Type */}
          <div className="col-md-6">
            <select
              className="form-select"
              name="addressType"
              onChange={handleChange}
              value={formData.addressType}
            >
              <option value="Residential">Residential</option>
              <option value="Business">Business</option>
            </select>
          </div>
          {/* Excise Tax */}
          <div className="col-md-12">
            <label className="form-label">Excise Tax:</label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="exciseTax"
                value="Yes"
                onChange={handleChange}
                checked={formData.exciseTax === "Yes"}
              />
              <label className="form-check-label">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="exciseTax"
                value="No"
                onChange={handleChange}
                checked={formData.exciseTax === "No"}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>
          {/* Email */}
          <div className="col-md-6">
            <input
              className="form-control"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          {/* Confirm Email */}
          <div className="col-md-6">
            <input
              className="form-control"
              name="confirmEmail"
              type="email"
              value={formData.confirmEmail}
              onChange={handleChange}
              placeholder="Confirm Email"
              required
            />
          </div>
          {/* Password */}
          <div className="col-md-6">
            <input
              className="form-control"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          {/* Confirm Password */}
          <div className="col-md-6">
            <input
              className="form-control"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>
          {/* Phone */}
          <div className="col-md-6">
            <input
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
          </div>
          {/* Phone Type */}
          <div className="col-md-6">
            <select
              className="form-select"
              name="phoneType"
              onChange={handleChange}
              value={formData.phoneType}
            >
              <option value="Home">Home</option>
              <option value="Mobile">Mobile</option>
              <option value="Work">Work</option>
            </select>
          </div>
          {/* Birthday */}
          <div className="col-md-6">
            <input
              className="form-control"
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={handleChange}
              required
            />
          </div>
          {/* Upload License */}
          <div className="col-md-6">
            <label className="form-label">Upload License (Required):</label>
            <input
              className="form-control"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              required
            />
          </div>
          {/* Subscribe */}
          <div className="col-md-12 form-check">
            <input
              className="form-check-input"
              name="subscribe"
              type="checkbox"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            <label className="form-check-label">
              Receive specials & coupons by email
            </label>
          </div>
          {/* Submit button */}
          <div className="col-12 d-grid">
            <button className="btn btn-primary" type="submit">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
