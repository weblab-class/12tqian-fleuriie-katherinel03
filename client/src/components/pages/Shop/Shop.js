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
                    <div className="shop2">
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
                    </div>
                </Collapsible>
            </div>
            <div className="shop">
                <Collapsible trigger="Garden Customization">
                    <div className="shop2">
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
                    </div>
                </Collapsible>
            </div>
        </div>
    );
};

export default Shop;