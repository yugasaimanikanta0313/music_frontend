import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams
import "../main/form.css";
import "../main/style.css";

export default function ViewCustomerProfile() {
  const [customerData, setCustomerData] = useState(null);
  const { email } = useParams(); // Extract email from URL parameters

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `https://muzic-h1kw3ki9l-yugasaimanikantas-projects.vercel.app/admin/viewcustomerprofile/${email}`
        );
        
        setCustomerData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (email) {
      fetchCustomerData();
    }
  }, [email]);

  if (!email) {
    return null;
  }

  return customerData ? (
    <div className="profile-card">
      <p>
        <strong>Full Name:</strong> {customerData.fullname}
      </p>
      <p>
        <strong>Gender:</strong> {customerData.gender}
      </p>
      <p>
        <strong>Date of Birth:</strong> {customerData.dateofbirth}
      </p>
      <p>
        <strong>Email:</strong> {customerData.email}
      </p>
      <p>
        <strong>Location:</strong> {customerData.location}
      </p>
      <p>
        <strong>Contact:</strong> {customerData.contact}
      </p>
      <p>
        <strong>Data:</strong> {JSON.stringify(customerData)}
      </p>
    </div>
  ) : (
    <p>No Data Found</p>
  );
}
