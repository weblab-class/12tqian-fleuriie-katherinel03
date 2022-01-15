import React from "react";
import { Link } from "@reach/router";

import "../../../utilities.css";
import "./Shop.css";
import Collapsible from 'react-collapsible';

const Shop = () => {
    return (
        <div className="Shop-background">
            <div>
                <Collapsible trigger="Avatar Customization">
                    <p>
                        Shop Items
                    </p>
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