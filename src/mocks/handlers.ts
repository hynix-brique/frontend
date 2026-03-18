import { HttpResponse, http } from "msw";
import type { Alarm } from "./api/hooks/useAlarms";
import type { OhtUsageMetrics } from "./api/hooks/useOhtUsageMetrics";
import type { TransferCancelMetrics } from "./api/hooks/useTransferCancelMetrics";
import type { TransferStoreMetrics } from "./api/hooks/useTransferStoreMetrics";

const SAMPLE_ALARMS: Alarm[] = [
	{
		alarmId: "ALM-001",
		fabId: "M14",
		message: "Current Queue too High",
		level: 1,
		occurredAt: "2026-03-18 10:32",
		details: "Queue length exceeded threshold of 500",
	},
	{
		alarmId: "ALM-002",
		fabId: "M07",
		message: "Temperature Exceeded",
		level: 1,
		occurredAt: "2026-03-18 09:51",
		details: "Chamber temperature reached 320°C (limit: 300°C)",
	},
	{
		alarmId: "ALM-003",
		fabId: "M08",
		message: "Pressure Sensor Fault",
		level: 2,
		occurredAt: "2026-03-18 11:05",
		details: "Pressure sensor P-3 returned invalid reading",
	},
	{
		alarmId: "ALM-004",
		fabId: "M21",
		message: "Flow Rate Warning",
		level: 2,
		occurredAt: "2026-03-18 10:44",
		details: "Gas flow rate deviation exceeds 5%",
	},
	{
		alarmId: "ALM-005",
		fabId: "M03",
		message: "Vibration Detected",
		level: 3,
		occurredAt: "2026-03-18 08:20",
		details: "Abnormal vibration on pump unit P-7",
	},
	{
		alarmId: "ALM-006",
		fabId: "M11",
		message: "Maintenance Scheduled",
		level: 4,
		occurredAt: "2026-03-18 07:00",
		details: "Scheduled PM due within 48 hours",
	},
	{
		alarmId: "ALM-007",
		fabId: "M05",
		message: "System Normal",
		level: 5,
		occurredAt: "2026-03-18 06:30",
		details: "All parameters within normal range",
	},
];

const SAMPLE_OHT_USAGE_METRICS: OhtUsageMetrics = {
	labels: [
		"Bay-A",
		"Bay-B",
		"Bay-C",
		"Bay-D",
		"Bay-E",
		"Bay-F",
		"Bay-G",
		"Bay-H",
	],
	values: [72, 85, 91, 78, 88, 65, 79, 83],
};

const SAMPLE_TRANSFER_CANCEL_METRICS: TransferCancelMetrics = {
	labels: [
		"Bay-A",
		"Bay-B",
		"Bay-C",
		"Bay-D",
		"Bay-E",
		"Bay-F",
		"Bay-G",
		"Bay-H",
	],
	values: [3, 7, 5, 12, 8, 4, 6, 9],
};

const SAMPLE_TRANSFER_STORE_METRICS: TransferStoreMetrics = {
	labels: [
		"Bay-A",
		"Bay-B",
		"Bay-C",
		"Bay-D",
		"Bay-E",
		"Bay-F",
		"Bay-G",
		"Bay-H",
	],
	saved: [120, 95, 140, 80, 110, 75, 130, 100],
	potential: [30, 40, 20, 50, 25, 45, 35, 30],
	target: [160, 150, 170, 145, 155, 130, 175, 145],
	baseline: [100, 90, 110, 85, 95, 80, 105, 90],
};

export const handlers = [
	http.get("http://localhost:8080/api/v1/alarms", () => {
		return HttpResponse.json(SAMPLE_ALARMS);
	}),
	http.get("http://localhost:8080/api/v1/metrics/oht-usage", () => {
		return HttpResponse.json(SAMPLE_OHT_USAGE_METRICS);
	}),
	http.get("http://localhost:8080/api/v1/metrics/transfer-cancel", () => {
		return HttpResponse.json(SAMPLE_TRANSFER_CANCEL_METRICS);
	}),
	http.get("http://localhost:8080/api/v1/metrics/transfer-store", () => {
		return HttpResponse.json(SAMPLE_TRANSFER_STORE_METRICS);
	}),
];
