import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export default function Viewer() {
    return (
        <div style={{ width: "800px", height: "600px", border: "1px solid #ccc" }}>
            <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={3}
                wheel={{
                    touchPadEnabled: true,
                    step: 0.05,           // 휠 민감도
                    smooth: true           // 부드러운 줌 적용
                }}
                pan={{ velocity: true }}
                animation={{
                    animationTime: 300,
                    animationType: "easeOutQuad",
                }}
            >
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        <div style={{ marginBottom: 10 }}>
                            <button onClick={() => zoomIn()}>Zoom In</button>
                            <button onClick={() => zoomOut()}>Zoom Out</button>
                            <button onClick={() => resetTransform()}>Reset</button>
                        </div>
                        <TransformComponent>
                            <div
                                style={{
                                    width: "300px",
                                    height: "300px",
                                    background: "linear-gradient(90deg, oklch(1, 1, 0), oklch(1, 1, 100))",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 32,
                                }}
                            >
                                Zoom & Pan Me
                            </div>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    )
}