import React from 'react';
import Button from '../Button/Button';
import Alert from '../Alert/Alert';
import Poster from '../Poster/Poster';

function Nominations(props) {
  return (
    <div className="bg-white mt-5 py-4 px-4 border border-gray-300 rounded-md md:flex-1 md:self-start relative">
      <p className="font-semibold mb-5">Nominations</p>
      {props.Nominations.length === 5 ? (
        <Alert
          message="you're done with nominations"
          reason="Maximum of 5 nominations"
          type="Success"
        />
      ) : null}
      <div className="pl-12">
        <ul className="list-disc space-y-3 divide-y divide-gray-200">
          {props.Nominations.map((nomination) => {
            return (
              <li key={nomination.id} className="py-4 flex items-center">
                <Poster src={nomination.poster} alt={nomination.title} />
                <div>
                  {nomination.title} ({nomination.year})
                  <Button clicked={() => props.removeNominate(nomination.id)}>Remove</Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Nominations;
