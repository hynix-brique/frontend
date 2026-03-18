import { Canvas } from "@react-three/fiber";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import * as THREE from "three";
import { useCampus3dStore } from "@/stores/campus3dStore";
import { CAM_POS } from "./constants";
import { CampusScene } from "./scene/CampusScene";
import { LoadingOverlay } from "./ui/LoadingOverlay";
import { SceneControls } from "./ui/SceneControls";

export interface Campus3DRef {
	setWarningBuildings: (names: string[]) => void;
}

const Campus3D = forwardRef<Campus3DRef>(function Campus3D(_, ref) {
	// 언마운트 시 스토어 초기화
	useEffect(() => {
		return () => {
			useCampus3dStore.setState({
				camera: null,
				controls: null,
				buildingGroups: {},
				buildingBoxes: {},
				buildingNames: [],
				containerEl: null,
				camXEl: null,
				camYEl: null,
				camZEl: null,
				camDEl: null,
				tgtXEl: null,
				tgtYEl: null,
				tgtZEl: null,
				loading: true,
				loadProgress: 0,
				focusBuilding: "",
				warningBuildings: [],
			});
		};
	}, []);

	// forwardRef: warningBuildings를 스토어에 써서 CampusScene이 감지
	useImperativeHandle(ref, () => ({
		setWarningBuildings: (names) =>
			useCampus3dStore.setState({ warningBuildings: names }),
	}));

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div
				ref={(el) => useCampus3dStore.setState({ containerEl: el })}
				style={{ flex: 1, position: "relative", minHeight: 0 }}
			>
				<Canvas
					frameloop="always"
					camera={{
						fov: 45,
						position: CAM_POS.toArray() as [number, number, number],
						near: 1,
						far: 5000,
					}}
					shadows
					gl={{
						antialias: true,
						toneMapping: THREE.ACESFilmicToneMapping,
						toneMappingExposure: 1.6,
					}}
					style={{ width: "100%", height: "100%" }}
				>
					<CampusScene />
				</Canvas>

				<LoadingOverlay />
			</div>

			<SceneControls />

			<style>{`
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        select option { background: #0a0a14; color: #ddd; }
      `}</style>
		</div>
	);
});

export default Campus3D;
