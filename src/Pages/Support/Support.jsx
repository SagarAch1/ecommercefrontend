import React from "react";

const Support = () => {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "50px",
      backgroundColor: "#f9f9f9",
    },
    content: {
      display: "flex",
      flexDirection: "row",
      maxWidth: "1200px",
      width: "100%",
      backgroundColor: "#fff",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      borderRadius: "8px",
    },
    textContainer: {
      flex: "1",
      paddingRight: "20px",
    },
    title: {
      fontSize: "36px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "20px",
    },
    description: {
      fontSize: "16px",
      color: "#666",
      lineHeight: "1.6",
      marginBottom: "20px",
    },
    callUs: {
      fontSize: "18px",
      color: "#ff0000",
      fontWeight: "bold",
    },
    imageContainer: {
      flex: "1",
      textAlign: "center",
    },
    image: {
      width: "80%",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.textContainer}>
          <h2 style={styles.title}>Customer Support</h2>
          <p style={styles.description}>
            Furniture Fusion is dedicated to helping people sell their furniture
            with ease and confidence. We understand that selling furniture can
            be a daunting task, which is why we've created a platform that
            simplifies the process. Whether you're downsizing, redecorating, or
            just looking to make some extra cash, Furniture Fusion is here to
            assist you every step of the way.
          </p>
          <p style={styles.callUs}>Call us: +977984040444</p>
        </div>
        <div style={styles.imageContainer}>
          <img
            style={styles.image}
            src="https://th.bing.com/th/id/R.3fb1fbb789333d7c53ec1de02104f64c?rik=XXfcw71wrkxDyw&riu=http%3a%2f%2feprtech.com%2fwp-content%2fuploads%2f2018%2f10%2fCustomer-Care.png&ehk=1tsonKFglQA6NvArYh3jB2O3e8jdFnaKnU1cAq2NG84%3d&risl=&pid=ImgRaw&r=0"
            alt="Customer Support"
          />
        </div>
      </div>
    </div>
  );
};

export default Support;
