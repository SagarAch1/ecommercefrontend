import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getContactsApi } from "../../apis/Api";

const Message = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    getContactsApi()
      .then((response) => {
        console.log("response", response.data);
        if (response.status === 200) {
          console.log("response", response);
          setContacts(response.data.data); // Assuming contacts is an array inside response.data
        } else {
          toast.error("Failed to fetch contacts");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while fetching contacts");
      });
  };

  const styles = {
    container: {
      padding: "50px",
      backgroundColor: "#f7f8fc",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    title: {
      color: "#5c20d0",
      fontSize: "32px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      padding: "12px",
      backgroundColor: "#5c20d0",
      color: "#000", // Changed to black
    },
    td: {
      padding: "12px",
      border: "1px solid #ccc",
      color: "#000", // Changed to black
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Contact Messages</h2>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>First Name</th>
            <th style={styles.th}>Last Name</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td style={styles.td}>{contact.firstName}</td>
              <td style={styles.td}>{contact.lastName}</td>
              <td style={styles.td}>{contact.phone}</td>
              <td style={styles.td}>{contact.email}</td>
              <td style={styles.td}>{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Message;
