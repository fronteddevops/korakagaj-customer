import Link from "next/link";
import React from "react";

const ThankYou = () => {
  const containerStyle = {
    backgroundImage: `url('/assets/imgs/theme/thank-you-515514_640.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center', // Center text horizontally
  };

  const contentStyle = {
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background for better readability
    borderRadius: '10px', // Rounded corners for the content box
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'underline', // Underline the link
    marginTop: '20px', // Add some spacing between the text and the link
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 className="text-white">Uh oh!</h1>
        <p style={{color:'white'}}>Your order has been created but payment failed! Kindly Contact Admin</p>
        <Link href="/myprofile/?index=2" as={`/myprofile/?index=2`}>
          <a style={linkStyle}>View Orders</a>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
