import React from 'react';

function Nominations(props) {
    return (
        <div className="bg-white mt-5 py-4 px-4 border border-gray-300 rounded-md">
            <p className="font-semibold mb-5">Nominations</p>
            <div className="pl-12">
                <ul className="list-disc space-y-3">
                    <li>
                        Rambo (1999)
                        <button className="btn">Remove</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Nominations;
