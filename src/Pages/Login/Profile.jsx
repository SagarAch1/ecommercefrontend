import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/user/current_profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        setFormData({
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/user/update_profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.user);
      toast.success("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/user/change-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Password changed successfully!");
      setPasswordData({ oldPassword: "", newPassword: "" });
      localStorage.removeItem("user");
      toast.success("Successfully logged out");
      navigate("/login");
    } catch (err) {
      setError("Failed to change password");
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!profileImage) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", profileImage);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/user/upload-profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Profile image updated successfully!");
    } catch (err) {
      setError("Failed to upload profile image");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              {user && (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formProfileImage" className="mt-3">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="profileImage"
                      onChange={handleImageChange}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <Button variant="primary" type="submit" className="mt-3">
                      Update Profile
                    </Button>
                    <Button
                      variant="success"
                      onClick={handleImageUpload}
                      className="mt-3 ml-3"
                    >
                      Upload Image
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Change Password</Card.Title>
              <Form onSubmit={handlePasswordSubmit}>
                <Form.Group controlId="formOldPassword">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Form.Group controlId="formNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Change Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
