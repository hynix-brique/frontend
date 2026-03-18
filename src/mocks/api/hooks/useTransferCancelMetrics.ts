import { useQuery } from "@tanstack/react-query";

export type TransferCancelMetrics = {
	labels: string[];
	values: number[];
};

export function useTransferCancelMetrics() {
	return useQuery<TransferCancelMetrics>({
		queryKey: ["metrics", "transfer-cancel"],
		queryFn: async () => {
			const res = await fetch(
				"http://localhost:8080/api/v1/metrics/transfer-cancel",
			);
			if (!res.ok) throw new Error("Failed to fetch transfer cancel metrics");
			return res.json();
		},
	});
}
