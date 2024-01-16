import React from "react";
import { Modal, Table } from "react-bootstrap";

const SizeChart = ({ showSizeChart, setShowSizeChart }) => {
  const sizeChartData = [
    { size: "Small", frontLength: "27.5", acrossShoulder: "16.3" },
    { size: "Medium", frontLength: "28.0", acrossShoulder: "17.0" },
    { size: "Large", frontLength: "28.5", acrossShoulder: "17.8" },
    { size: "Extra Large", frontLength: "29.0", acrossShoulder: "18.6" },
  ];

  const handleClose = () => {
    setShowSizeChart(!showSizeChart);
  };

  return (
    <Modal
      show={showSizeChart}
      onHide={handleClose}
      centered
      dialogClassName="size-chart-modal-custom"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h4>Size Chart</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="size-chart">
          <Table bordered className="table">
            <thead>
              <tr className="text-center">
                <th>Size</th>
                <th>Front Length</th>
                <th>Across Shoulder</th>
              </tr>
            </thead>
            <tbody>
              {sizeChartData.map((data, index) => (
                <tr key={index} className="text-center">
                  <td>{data.size}</td>
                  <td>{data.frontLength}</td>
                  <td>{data.acrossShoulder}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <small style={{ fontSize: "10px" }}>
            Please note: Size chart is for reference only. Sizes may vary
            between brands.
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SizeChart;
