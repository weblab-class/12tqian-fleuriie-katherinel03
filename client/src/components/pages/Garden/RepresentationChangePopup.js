import React, { useEffect, useState } from "react";

import { representationList } from "../../constants/constants";

import Catalog from "react-catalog-view";
import { get, post } from "../../../utilities";

const RepresentationChangePopup = (props) => {
	const [currency, setCurrency] = useState(0);

	useEffect(() => {
		get("/api/userprofile", {
			googleID: props.userGoogleID,
		}).then((profile) => {
			setCurrency(profile.currency);
		});
	}, []);

	const products = representationList.map((image, index) => {
		return {
			id: index,
			title: image.name,
			currency: " candy",
			cost: image.cost,
			image: image.image,
		}
	});

	const handleBuy = (itemID) => {
		const item = representationList[itemID];
		setCurrency(currency - item.cost);
		post("/api/userprofileupdate",
			{
				googleID: props.userGoogleID,
			},
			{
				currency: currency,
			});
	};

	const handleTry = (itemID) => {

	};

	console.log(products);

	const CONTENT_KEYS =
	{
		imgKey: "image",
		cardTitleKey: "title",
		// cardDescriptionKey: "description",
		priceKey: "cost",
		// discountedPriceKey: "discounted
		priceCurrencyKey: "currency",
		discountCurrencyKey: "currency"
	};

	return (
		<Catalog
			data={products}
			// Array of JSON Objects (required)
			contentKeys={CONTENT_KEYS}
			// JSON Object defining the keys that will be 
			// used from the data array, keys should match. (required)
			cardSize="md"
			// Card sizes, sm, md and lg for small, medium  and large
			btnOneText="View"
			// Enter text for action button one 
			// or pass empty string to hide.  
			btnTwoText="Purchase Now"
			// Enter text for action button two 
			// or pass empty string to hide.
			btnOneHandler={(args, event, objectData) => {
				// 'objectData' returns object data
				// any arguments passed will be before 'event' 
				// and 'objectData'
			}}
			btnTwoHandler={(args, event, row) => {
				// 'objectData' returns object data
				// any arguments passed will be before 'event' 
				// and 'objectData'
			}}
			skeleton={0}
		// Any non zero number will override default cards
		// and will show that many skeleton cards.
		/>
	)

};

export default RepresentationChangePopup;