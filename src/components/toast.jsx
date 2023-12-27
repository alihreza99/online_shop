import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
function DismissibleExample({ text }) {
  return (
    <ToastContainer
      dir="rtl"
      className="p-3"
      position="bottom-end"
      style={{ zIndex: 1 }}
    >
      <Toast bg={"Dark".toLowerCase()}>
        <Toast.Body className={"Dark" === "Dark" && "text-white"}>
          {text}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default DismissibleExample;
