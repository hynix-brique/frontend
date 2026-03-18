import { useQuery } from "@tanstack/react-query";

export type Site = {
	siteId: string;
	name: string;
};

export function useSites() {
	return useQuery<Site[]>({
		queryKey: ["sites"],
		queryFn: async () => {
			const res = await fetch("http://localhost:8080/api/v1/sites");
			if (!res.ok) throw new Error("Failed to fetch sites");
			return res.json();
		},
	});
}
