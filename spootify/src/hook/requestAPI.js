import axios from "axios";
import config from "../config";
import query from "querystring";
export const requestAPI = async (path) => {
	const { api } = config;
	// Grant access token

	const {
		data: { access_token: token },
	} = await axios.post(
		"https://accounts.spotify.com/api/token",
		query.stringify({ grant_type: "client_credentials" }),
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${btoa(`${api.clientId}:${api.clientSecret}`)}`,
			},
		},
	);

	const response = await axios.get(
		`${api.baseUrl}/browse/${path}?country=FR&offset=10&limit=20`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	);
	console.log(response);
	return response.data;
};
