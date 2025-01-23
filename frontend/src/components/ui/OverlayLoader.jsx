import { Loader, Overlay } from "@mantine/core";

const OverlayLoader = ({ show = true, children }) => {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          filter: show ? "blur(0.6px)" : "none",
          transition: "filter 0.2s ease",
        }}
      >
        {children}
      </div>
      {show && (
        <Overlay
          opacity={0.6}
          color="#fff"
          zIndex={10}
          blur={0.6}
          center
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader color="blue" size="lg" />
        </Overlay>
      )}
    </div>
  );
};

export default OverlayLoader;
