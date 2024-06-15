import React from "react";

interface IAddressProps {
    street: string;
    streed2?: string;
    city: string;
    state: string;
    zip: string;
}

export default function Address({ street, streed2, city, state, zip }: IAddressProps) {
    return (
        <div>
            <p>{street}</p>
            {streed2 && <p>{streed2}</p>}
            <p>{city}, {state} {zip}</p>
        </div>
    );
}