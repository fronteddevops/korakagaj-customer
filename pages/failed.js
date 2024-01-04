// import Link from "next/link";
// import React from "react";
// import Layout from "../components/layout/Layout";

// const ThankYou = () => {
//   const containerStyle = {
//     backgroundImage: `url('/assets/imgs/theme/pexels-vie-studio-4439457.jpg')`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "white",
//     textAlign: "center",
//   };

//   const contentStyle = {
//     padding: "20px",
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//     borderRadius: "10px",
//     width: "80%",
//     maxWidth: "400px",
//   };

//   const linkStyle = {
//     color: "white",
//     textDecoration: "underline",
//     marginTop: "20px",
//   };

//   return (
//     <Layout>
//       <div style={containerStyle}>
//         <div style={contentStyle}>
//           <h1 className="text-white">Uh oh!</h1>
//           <p style={{ color: "white" }}>
//             Your order has been created but payment failed! Kindly Contact Admin
//           </p>
//           <Link href="/myprofile/?index=2" as={`/myprofile/?index=2`}>
//             <a style={linkStyle}>View Orders</a>
//           </Link>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ThankYou;








import Link from "next/link";
import React from "react";
import Layout from "../components/layout/Layout";

const ThankYou = () => {
  const containerStyle = {
    backgroundImage: `url('/assets/imgs/theme/pexels-vie-studio-4439457.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
  };
  

  const contentStyle = {
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black background for better readability
    borderRadius: "10px", // Rounded corners for the content box
  };

  const linkStyle = {
    color: "white",
    textDecoration: "underline", // Underline the link
    marginTop: "20px", // Add some spacing between the text and the link
  };
  return (
    <Layout>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <h1 className="text-white">Uh oh!</h1>
          <p style={{ color: "white" }}>
            Your order has been created but payment failed! Kindly Contact Admin
          </p>
          <Link href="/myprofile/?index=2" as={`/myprofile/?index=2`}>
            <a style={linkStyle}>View Orders</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYou;
