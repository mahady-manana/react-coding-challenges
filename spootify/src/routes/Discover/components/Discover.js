import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import { getCategory, getNewReleases, getPlayList } from "../../../hook";

export default class Discover extends Component {
	constructor() {
		super();

		this.state = {
			newReleases: [],
			playlists: [],
			categories: [],
		};
	}

	async componentDidMount() {
		const allCategories = await getCategory();
		const allNews = await getNewReleases();
		const allPlaylists = await getPlayList();
		this.setState(() => ({
			newReleases: allNews,
			playlists: allPlaylists,
			categories: allCategories,
		}));
	}

	render() {
		const { newReleases, playlists, categories } = this.state;

		return (
			<div className='discover'>
				<DiscoverBlock
					text='RELEASED THIS WEEK'
					id='released'
					data={newReleases}
				/>
				<DiscoverBlock
					text='FEATURED PLAYLISTS'
					id='featured'
					data={playlists}
				/>
				<DiscoverBlock
					text='BROWSE'
					id='browse'
					data={categories}
					imagesKey='icons'
				/>
			</div>
		);
	}
}
