import { ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Select } from "antd";
import { useState } from "react";
import { useSites } from "../../mocks/api/hooks/useSites";
import AlarmPanel from "./components/AlarmPanel";
import Campus3D from "./components/campus3d/Campus3D";
import { resetCameraView } from "./components/campus3d/ui/SceneControls";

export default function MainPage() {
	const { data: sites = [] } = useSites();
	const [selectedSite, setSelectedSite] = useState<string | undefined>(
		undefined,
	);

	const siteOptions = sites.map((s) => ({ value: s.siteId, label: s.name }));

	return (
		<>
			{/* Canvas + 관제 Site */}
			<Card
				style={{ flex: 1, overflow: "hidden" }}
				styles={{
					body: {
						display: "flex",
						flexDirection: "column",
						gap: 8,
						padding: 16,
						height: "100%",
					},
				}}
			>
				<div style={{ display: "flex", alignItems: "center" }}>
					<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
						<span style={{ fontSize: 13 }}>관제 Site</span>
						<Select
							value={selectedSite ?? siteOptions[0]?.value}
							options={siteOptions}
							onChange={setSelectedSite}
							size="small"
							allowClear={false}
						/>
					</div>
					<Button
						icon={<ReloadOutlined />}
						size="small"
						style={{ marginLeft: "auto" }}
						onClick={resetCameraView}
					/>
				</div>
				<div style={{ flex: 1, position: "relative", minHeight: 0 }}>
					<Campus3D />
				</div>
			</Card>

			{/* Alarm + Trend */}
			<Card
				style={{ width: 300, flexShrink: 0, overflow: "hidden" }}
				styles={{ body: { padding: 0, height: "100%" } }}
			>
				<AlarmPanel />
			</Card>
		</>
	);
}
