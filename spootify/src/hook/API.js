import { requestAPI } from "./requestAPI";

export const getNewReleases = async () => {
	const data = await requestAPI("new-releases");
	return data.albums.items;
};

export const getPlayList = async () => {
	const data = await requestAPI("featured-playlists");
	console.log(data);
	return data.playlists.items;
};

export const getCategory = async () => {
	const data = await requestAPI("categories");
	return data.categories.items;
};
