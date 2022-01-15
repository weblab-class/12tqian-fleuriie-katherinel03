import React from "react";
import { Link } from "@reach/router";
import shop from "./shop.png";

import "../../../utilities.css";
import "./Shop.css";
import Collapsible from 'react-collapsible';
import Popup from 'reactjs-popup';

const Shop = () => {
    return (
        <div className="Shop-background">
            <div className="shop">
                <Collapsible trigger="Avatar Customization">
                    <div className="shop2">
                    <Popup
                        trigger={<button className="button"> <img className="photo" src={shop} /> </button>}
                        modal
                        nested
                    >
                        {close => (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div className="header"> Item Name </div>
                                <div className="content">
                                    {' '}
                                    <img className="photo2" src={shop} class="center" />
                                </div>
                                <div className="actions">
                                    <button> Buy </button>
                                    <button
                                        className="button"
                                            onClick={() => {
                                            console.log('modal closed ');
                                            close();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>                        
                    <img className="photo" src={shop} />;
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
                <div className="space"></div>
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