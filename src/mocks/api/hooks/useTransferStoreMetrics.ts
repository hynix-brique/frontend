import { useQuery } from "@tanstack/react-query";

export type TransferStoreMetrics = {
	labels: string[];
	saved: number[];
	potential: number[];
	target: number[];
	baseline: number[];
};

export function useTransferStoreMetrics() {
	return useQuery<TransferStoreMetrics>({
		queryKey: ["metrics", "transfer-store"],
		queryFn: async () => {
			const res = await fetch(
				"http://localhost:8080/api/v1/metrics/transfer-store",
			);
			if (!res.ok) throw new Error("Failed to fetch transfer store metrics");
			return res.json();
		},
	});
}
