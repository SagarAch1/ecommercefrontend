import React from 'react';

const About = () => {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '50px',
      backgroundColor: '#f5f5f5',
    },
    content: {
      display: 'flex',
      flexDirection: 'row',
      maxWidth: '1200px',
      width: '100%',
      backgroundColor: '#fff',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '8px',
    },
    imageContainer: {
      flex: '1',
      paddingRight: '20px',
    },
    image: {
      width: '100%',
      borderRadius: '8px',
    },
    textContainer: {
      flex: '2',
      paddingLeft: '20px',
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '20px',
    },
    description: {
      fontSize: '16px',
      color: '#666',
      lineHeight: '1.6',
    },
    socialIcons: {
      display: 'flex',
      marginTop: '20px',
    },
    icon: {
      fontSize: '24px',
      color: '#333',
      marginRight: '15px',
      textDecoration: 'none',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.imageContainer}>
          <img
            style={styles.image}
            src="https://th.bing.com/th/id/R.9ec9373380db87356b737f3f499781e8?rik=KJz%2bQIgDK1ZYFA&riu=http%3a%2f%2fclipart-library.com%2fimages%2f5cRrdRdzi.jpg&ehk=%2bA0T0uJAczIhHXRguVlPPbbPHGcj3iSOZfAJO5sRcys%3d&risl=&pid=ImgRaw&r=0"
            alt="About Us"
          />
        </div>
        <div style={styles.textContainer}>
          <h2 style={styles.title}>ABOUT US</h2>
          <p style={styles.description}>
            Our company started as a small interior design firm in downtown Michigan, aiming to bring home luxury to make us relive the new space that they try to create. We aim to become a clique that would make anyone smile. We create ideas beyond this world with floor plans and let them craft their dreams from the get-go.
          </p>
          <p style={styles.description}>
            Currently, we offer house valet, interior design, and architecture services in order to help our customers find a home heaven as soon as feasibly possible. We value our customers above anything else, meaning that we won’t stop till we arrive at an answer.
          </p>
          <div style={styles.socialIcons}>
            <a href="#" style={styles.icon}>🐦</a>
            <a href="#" style={styles.icon}>📘</a>
            <a href="#" style={styles.icon}>📷</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
