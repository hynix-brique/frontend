import { useQuery } from "@tanstack/react-query";

export type OhtUsageMetrics = {
	labels: string[];
	values: number[];
};

export function useOhtUsageMetrics() {
	return useQuery<OhtUsageMetrics>({
		queryKey: ["metrics", "oht-usage"],
		queryFn: async () => {
			const res = await fetch("http://localhost:8080/api/v1/metrics/oht-usage");
			if (!res.ok) throw new Error("Failed to fetch OHT usage metrics");
			return res.json();
		},
	});
}
