import React from "react";
import { Link } from "@reach/router";
import shop from "./shop.png";

import "../../../utilities.css";
import "./Shop.css";
import Collapsible from 'react-collapsible';

const Shop = () => {
    return (
        <div className="Shop-background">
            <div className="shop">
                <Collapsible trigger="Avatar Customization">
                    <div>
                        <img className="photo" src={shop} />;
                        <img className="photo" src={shop} />;
                    </div>
                    <div>
                        <img className="photo" src={shop} />;
                        <img className="photo" src={shop} />;
                    </div>
                    <div>
                        <img className="photo" src={shop} />;
                        <img className="photo" src={shop} />;
                    </div>
                    <div>
                        <img className="photo" src={shop} />;
                        <img className="photo" src={shop} />;
                    </div>

                </Collapsible>
            </div>
            <div>
                <Collapsible trigger="Garden Customization">
                    <p>
                        Shop Items
                    </p>
                </Collapsible>
            </div>
        </div>
    );
};

export default Shop;