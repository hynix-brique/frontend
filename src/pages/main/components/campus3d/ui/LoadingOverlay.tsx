import { Spin } from "@/lib/antd";
import { useCampus3dStore } from "@/pages/main/components/campus3d/store/campus3dStore";

export function LoadingOverlay() {
	const loading = useCampus3dStore((s) => s.loading);
	const loadProgress = useCampus3dStore((s) => s.loadProgress);

	if (!loading) return null;

	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				background: "rgba(10,10,20,0.95)",
				zIndex: 1000,
			}}
		>
			<Spin tip="Loading data..." tipType="percent" value={loadProgress} />
		</div>
	);
}
